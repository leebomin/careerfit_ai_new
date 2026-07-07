# 🚀 Render 클라우드 Docker 기반 프론트엔드 배포 가이드

본 문서는 React/Vite 기반 프론트엔드 애플리케이션을 로컬에서 실행하고, 클라우드 서비스인 Render에 Docker 기반으로 배포하는 전체 과정을 설명합니다.

---

## 1. 로컬 개발 환경 실행 방법

### 백엔드 (FastAPI) 실행
1. `backend/.env` 파일 확인 (없을 시 `.env.example` 복사 후 생성)
2. 필수 변수 입력: `GEMINI_API_KEY`, `FRONTEND_ORIGINS`
3. 터미널 실행:
```bash
   cd backend
   venv\Scripts\activate
   uvicorn main:app --reload --port 8000
```

### 프론트엔드 (React/Vite) 실행
1. `frontend/.env` 파일 확인 (없을 시 `.env.example` 복사 후 생성)
2. 필수 변수 입력: `VITE_API_BASE_URL=http://localhost:8000`
3. 터미널 실행:
```bash
   cd frontend
   npm install
   npm run dev
```

---

## 2. 핵심 환경변수 매핑

| 서비스 구분 | 환경변수명 | 권장 설정값 (예시) | 설명 |
|---|---|---|---|
| 프론트엔드 | `VITE_API_BASE_URL` | `https://careerfit-backend.onrender.com` | 프론트엔드가 호출하는 Render 백엔드 주소 |
| 백엔드 | `FRONTEND_ORIGINS` | `http://localhost:5173,https://careerfit-web.onrender.com` | 브라우저 차단을 막기 위한 허용 도메인 목록 |
| 백엔드 | `GEMINI_API_KEY` | `AIzaSyD...` | 구글 AI LLM 연동을 위한 전용 기밀 키 |

---

## 3. Render 클라우드 Docker 배포 가이드

### [Step 1] GitHub 코드 푸시
배포에 불필요하거나 기밀 데이터인 `.env`, `node_modules`, `dist` 등이 Git에 올라가지 않았는지 확인 후 `main` 브랜치에 푸시합니다.

### [Step 2] Render Web Service 생성
- Render 대시보드 접속 후 **New +** → **Web Service** 클릭
- 대상 프로젝트의 Git Repository 연동
- 서비스 빌드 설정:
  - **Name**: `careerfit-frontend` (자유 설정)
  - **Region**: 백엔드와 동일한 리전 권장 (예: Singapore, Oregon 등)
  - **Branch**: `main`
  - **Runtime**: ✨ **Docker** (반드시 Docker 선택)
  - **Dockerfile Path**: `frontend/Dockerfile` (최상위 루트 기준 경로 명시)

### [Step 3] 환경변수(Environment Variables) 입력
웹 서비스 설정 탭 내 **Environment** 메뉴에서 다음 키값을 추가합니다.
- 키: `VITE_API_BASE_URL` / 값: `https://배포된-백엔드-주소.onrender.com`

### [Step 4] 백엔드 CORS 갱신
- 프론트엔드 배포가 완료되면 Render 주소(예: `https://careerfit-frontend.onrender.com`)가 발급됩니다.
- 기존에 배포되어 있던 FastAPI 백엔드 서비스의 **Environment** 탭으로 이동하여 `FRONTEND_ORIGINS` 값 뒤에 쉼표(`,`)를 붙이고 새 프론트엔드 주소를 추가한 뒤 저장(재배포)합니다.

---

## 4. 문제 해결 - CORS 체크리스트

**현상**: 프론트엔드에서 버튼 클릭 시 CORS Error 또는 Network Error 발생
**원인**: 백엔드가 허용하지 않은 도메인에서 접근했거나, 변경된 주소가 백엔드에 동적으로 반영되지 않음

**해결책**:
1. 개발자 도구(F12) 콘솔에서 어떤 도메인이 차단되었는지 확인
2. 백엔드의 `FRONTEND_ORIGINS` 변수 철자(마지막 슬래시 `/` 유무 등) 확인 후 업데이트

---

# 📊 최종 보고

## 1. 수정한 파일
- `backend/main.py` (CORS 동적 환경 변수 분기 로직 통합)
- `.gitignore` (보안 관련 라인 강화)

## 2. 새로 만든 파일
- `backend/.env.example` (백엔드 배포용 템플릿)
- `frontend/.env.example` (프론트엔드 환경 변수 템플릿)
- `frontend/src/services/api.js` (API 연동용 공통 클라이언트)
- `frontend/Dockerfile` (Vite 빌드 + Nginx 서빙용 멀티 스테이지 명세)
- `frontend/.dockerignore` (도커 빌드 컨텍스트 최적화)
- `docs/render-frontend-deploy.md` (클라우드 배포 가이드 문서)

## 3. 핵심 변경 이유
- 백엔드 주소가 하드코딩되어 있으면 코드가 바뀔 때마다 다시 빌드해야 하는 문제가 있어, 이를 방지하기 위해 **환경 변수 기반 동적 스위칭 아키텍처**를 구성했습니다.
- 기밀 API Key나 `node_modules` 등이 실수로 GitHub에 올라가지 않도록 `.gitignore`를 정교화했습니다.

## 4. 로컬 실행 방법
- **백엔드**: `backend/` 폴더 진입 → 가상환경 활성화 → `uvicorn main:app --reload`
- **프론트엔드**: `frontend/` 폴더 진입 → `npm install` → `npm run dev`

## 5. Render 배포 방법
- 프론트엔드 런타임을 **Docker**로 지정하고, 빌드 경로를 `frontend/Dockerfile`로 지정하여 웹 서비스를 생성 및 환경 변수를 연동합니다.

## 6. 사용자가 직접 입력해야 하는 값
- `GEMINI_API_KEY` (본인의 구글 AI 서비스 인증 키)
- `FRONTEND_ORIGINS` 및 `VITE_API_BASE_URL` (배포 완료 후 Render가 발급한 실제 도메인 주소)

## 7. 최종 확인 체크리스트
- [ ] 백엔드 `FRONTEND_ORIGINS`에 쉼표로 분리된 도메인 끝에 슬래시(`/`)가 들어가지 않았는가?
- [ ] 프론트엔드 빌드 시 `import.meta.env.VITE_API_BASE_URL`이 정상적으로 백엔드를 가리키는가?
- [ ] `.env` 파일들이 `git status` 확인 시 정상적으로 무시(ignore) 처리되는가?