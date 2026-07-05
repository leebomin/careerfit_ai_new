# careerfit\_ai\_new

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

## 데이터 파이프라인

데이터 분석 직무에 맞게 데이터를 수집하고, 전처리하여 RAG 기반 검색을 위해 구조화하는 파이프라인입니다.

| 단계 | 도구 | 설명 |
|---|---|---|
| 수집 | CSV | 강사 제공 목업 데이터 + 개인화 데이터 |
| 전처리 | Pandas | 결측치 처리, 중복 데이터 제거, 기술 스택(Skills) 명칭 표준화 |
| 구조화 저장 | SQLite | 조건부 필터링 및 조회를 위한 관계형 데이터베이스(RDB) 적재 |
| 벡터 저장 | ChromaDB | 의미 기반 검색(RAG)을 위한 텍스트 임베딩 및 벡터 데이터베이스 적재 |

### 데이터 전처리 실행 방법
데이터베이스 구축 전 원시 데이터(CSV)를 가공하기 위한 명령어입니다. 프로젝트 백엔드 디렉토리에서 실행합니다.

**MacOS**
`source venv/bin/activate`
`python3 data/preprocess.py`

**Windows**
`venv\Scripts\activate`
`python data/preprocess.py`

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

- [ ] **4일차: RAG 기반 서비스 + React UI**

- [ ] **5일차: Docker + 포트폴리오 완성**
