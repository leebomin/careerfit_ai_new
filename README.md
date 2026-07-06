### careerfit_ai_new

# CareerFit AI

> 취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치

## 프로젝트 개요
사용자의 개인 활동 이력과 실제 채용 공고 및 공모전 요구사항 간의 **적합성**을 분석하여, 데이터 기반의 맞춤형 포트폴리오 전략을 제시하는 AI 서비스입니다. 

## 기술 스택

| 영역 | 기술 |
|---|---|
| 백엔드 | Python, FastAPI |
| AI API | Gemini 2.5 Flash-Lite |
| 데이터 | Pandas, SQLite, ChromaDB |
| 프론트엔드 | React, Vite |
| 실행 환경 | Docker |

## 서비스 실행 방법

### 💻 프론트엔드 (Frontend)
```bash
cd frontend
npm install
npm run dev
```
- **접속 주소:** http://localhost:5173

### ⚙️ 백엔드 (Backend)
```bash
# 가상환경 활성화 후 서버 실행
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
- **API 문서 대시보드:** http://localhost:8000/docs

## 주요 기능 구현 현황

- [x] **역량 분석 입력 폼 (`InputForm.jsx`)**
  - 전공, 보유 스킬(쉼표 구분), 관심 직무 입력 필드 구현
  - 모든 필드 입력 완료 시에만 분석 버튼이 활성화되는 유효성 검사 로직 적용
  - 분석 요청 중 버튼 비활성화 및 로딩 애니메이션 피드백 제공

- [x] **RAG 기반 AI 분석 결과 카드 (`ResultCard.jsx`)**
  - AI 분석 답변 본문 출력 (`whitespace-pre-line` 가독성 확보)
  - 분석 신뢰도(`confidence`) 레벨에 따른 가변 컬러 하이라이트 시스템 (Amber/Blue)
  - 데이터 기반 매칭된 핵심 역량 및 보완 필요 스킬 세부 그리드 레이아웃 시각화
  - 역량 강화를 위한 추천 프로젝트 리스트업 기능

- [x] **출처 공고 카드 (`SourceCard.jsx`)**
  - 분석의 확실한 근거가 되는 참고 공고 출처 리스트 바인딩
  - 채용/공모전 성격을 즉각 식별할 수 있는 공고 유형 뱃지(`type`) 시스템
  - 매칭 사유(`matched_reason`)를 시각적으로 분리한 매칭 근거 텍스트 박스 제공

- [x] **UI 상태 처리 규칙 (State Handling) 예외 처리**
  - `empty`: 분석 전 메인 화면 가이드 안내 문구 출력
  - `loading`: 분석 진행 중 상태 피드백 화면 제공
  - `success`: 결과 표시 성공 및 데이터 바인딩
  - `error`: API 통신 실패 시 Red 계열의 에러 경고 가이드 노출
  - `no sources`: 일치하는 공고가 없을 때 숨기지 않고 명확하게 데이터 미존재 안내 처리

## 데이터 파이프라인

데이터 분석 직무에 맞게 데이터를 수집하고, 전처리하여 RAG 기반 검색을 위해 구조화하는 파이프라인입니다.

| 단계 | 도구 | 설명 |
| --- | --- | --- |
| 수집 | CSV | 강사 제공 목업 데이터 + 개인화 데이터 |
| 전처리 | Pandas | 결측치 처리, 중복 데이터 제거, 기술 스택(Skills) 명칭 표준화 |
| 구조화 저장 | SQLite | 조건부 필터링 및 조회를 위한 관계형 데이터베이스(RDB) 적재 |
| 벡터 저장 | ChromaDB | 의미 기반 검색(RAG)을 위한 텍스트 임베딩 및 벡터 데이터베이스 적재 |

### 데이터 전처리 실행 방법

데이터베이스 구축 전 원시 데이터(CSV)를 가공하기 위한 명령어입니다. 프로젝트 백엔드 디렉토리에서 실행합니다.

**MacOS**
```bash
source venv/bin/activate
python3 data/preprocess.py
```

**Windows**
```bash
venv\Scripts\activate
python data/preprocess.py
```

## 진행 현황

- [x] **1일차: 프로젝트 기획 및 개발 환경 세팅**
- [x] **2일차: FastAPI 서버 구축 및 Gemini API 연결**
  - FastAPI `/health`, `/jobs`, `/analyze` 엔드포인트 구현
  - Python 개발 환경 설정 및 백엔드 구조 구축
  - Gemini 2.5 Flash-Lite API 연결
  - 환경변수 기반 mock mode 설정

- [x] **3일차: 데이터 파이프라인 구축 및 프로젝트 구조화**
  - 데이터 전처리 스크립트(`preprocess.py`) 작성 및 로직 수정
  - 취업 및 공모전 분석용 데이터 구조 설계 (`jobs.csv` 구성)
  - Gemini 모델 프롬프트 예시 수정 및 API 호출 테스트 완료
  - 전체 서비스 폴더 및 기본 디렉토리 구조 확립

- [x] **4일차: RAG 기반 서비스 + React UI**
  - ChromaDB 문서 검색 기반의 RAG 서비스 파이프라인 구축 (`rag_service.py`)
  - Gemini RAG 컨텍스트 결합 프롬프트 가공 및 답변 생성 로직 연동 (`llm_service.py`)
  - 프론트엔드 React + Vite 독립 프로젝트 빌드 및 환경 구성
  - UI 디자인 지침서 문서화 및 예외 처리 가이드 수립 (`design-skill.md`)
  - UI 상태 처리(empty, loading, success, error, no sources)를 고려한 아키텍처 구현 (`App.jsx`)
  - 텍스트 레이블 및 레이아웃을 고도화한 `InputForm`, `ResultCard`, `SourceCard` 핵심 컴포넌트 자가 검수 및 제작 완료
  - `fetch` API를 이용한 크로스 도메인(CORS) 대응 및 프론트-백엔드 `/analyze` 데이터 송수신 확인 완료

- [ ] **5일차: Docker + 포트폴리오 완성**

## Git 커밋 및 배포 기록

오늘 최종 구현된 코드는 아래 규격에 맞추어 안정적으로 형상 관리에 반영되었습니다.

```bash
git add .
git commit -m "feat: RAG 기반 /analyze API 및 React UI 구현

- ChromaDB 문서 검색 (rag_service.py)
- Gemini RAG 연결 답변 생성 (llm_service.py)
- React + Vite 프로젝트 생성
- InputForm, ResultCard, SourceCard 컴포넌트
- fetch로 /analyze API 연결
- design-skill.md 작성"
git push
```