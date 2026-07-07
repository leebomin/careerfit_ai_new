# backend/Dockerfile

# 1. 베이스 이미지 선택
# Python 3.11 슬림 버전 — 불필요한 것 없이 가벼운 이미지
# 요리 비유: 기본 주방 설비가 갖춰진 빈 주방을 가져오는 것
FROM python:3.11-slim

# [개선 3] 헬스체크에 필요한 curl 패키지 설치 및 패키지 목록 정리
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# 2. 작업 디렉토리 설정
# 컨테이너 안에서 코드를 놓을 폴더
WORKDIR /app

# [개선 2] 보안 강화를 위한 비루트(Non-root) 사용자 생성 및 폴더 권한 부여
RUN useradd -m appuser && chown -R appuser:appuser /app

# 3. 패키지 목록 먼저 복사 (캐싱 최적화)
# requirements.txt 가 변경되지 않으면 pip install 단계를 다시 실행하지 않음
COPY requirements.txt .

# 4. 패키지 설치
# [개선 1] 네트워크 오류에 대비해 `--retries 5` 옵션 추가
RUN pip install --no-cache-dir --retries 5 -r requirements.txt

# 5. 나머지 코드 복사
# .env 파일은 복사하지 않습니다 — docker run 시 환경변수로 주입
# [개선 2] 복사할 때 소유권을 비루트 사용자인 appuser로 지정
COPY --chown=appuser:appuser . .

# 6. 포트 선언
# 컨테이너 내부에서 8000번 포트를 사용한다고 선언
EXPOSE 8000

# [개선 2] 이후 실행되는 프로세스(Uvicorn)의 권한을 비루트 사용자로 전환
USER appuser

# 7. 실행 명령
# docker run 시 자동으로 실행되는 명령어
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# [개선 3] /health 엔드포인트를 활용한 컨테이너 실시간 상태 감시(헬스체크) 설정
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1