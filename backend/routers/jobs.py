# backend/routers/jobs.py

from fastapi import APIRouter

from typing import List

router = APIRouter()



# 목업 데이터: 3일차에 실제 CSV 데이터로 교체한다

MOCK_JOBS = [

    {
    "id": 1,
    "company": "카카오",
    "title": "데이터 분석가",
    "required_skills": ["Python", "SQL", "통계 분석", "A/B 테스트"],
    "preferred_skills": ["Tableau", "머신러닝", "Spark"],
    "description": "서비스 이용 데이터를 분석해 사용자 행동 패턴과 핵심 지표를 도출합니다. 가설 검정과 실험 설계를 통해 제품 개선 인사이트를 제공합니다. 분석 결과를 비개발 직군도 이해할 수 있도록 시각화·리포트로 공유합니다.",
    "deadline": "2026-08-31"
},

    {
    "id": 2,
    "company": "네이버클라우드",
    "title": "데이터 엔지니어",
    "required_skills": ["Python", "SQL", "ETL", "Linux"],
    "preferred_skills": ["Airflow", "AWS", "Docker"],
    "description": "대용량 로그·거래 데이터의 수집·정제·적재 파이프라인을 설계·운영합니다. 데이터 품질과 처리 지연을 모니터링하고 분석·연구팀이 쓰기 좋은 형태로 마트를 구축합니다. 통계·분석 요구사항을 반영해 스키마와 배치 작업을 개선합니다.",
    "deadline": "2026-08-31"
},

    {
    "id": 3,
    "company": "한국전자통신연구원",
    "title": "AI·데이터 연구원",
    "required_skills": ["Python", "통계 모델링", "논문 작성", "실험 설계"],
    "preferred_skills": ["PyTorch", "R", "시계열 분석"],
    "description": "공공·산업 데이터를 활용한 예측·분류 모델을 연구·개발합니다. 통계적 검증과 재현 가능한 실험으로 모델 성능을 평가하고 논문·기술보고서를 작성합니다. 연구 결과를 실서비스 또는 PoC로 이어갈 수 있도록 프로토타입을 구현합니다.",
    "deadline": "2026-08-31"
}

]



@router.get("/jobs", tags=["Jobs"])

def get_jobs():

    """

    취업 공고 목록을 반환하는 엔드포인트.

    현재는 목업 데이터를 반환하며, 3일차에 실제 데이터로 교체한다.

    """

    return {

        "count": len(MOCK_JOBS),

        "jobs": MOCK_JOBS

    }



@router.get("/jobs/{job_id}", tags=["Jobs"])

def get_job_by_id(job_id: int):

    """

    특정 공고의 상세 정보를 반환한다.

    """

    for job in MOCK_JOBS:

        if job["id"] == job_id:

            return job

    # 찾지 못한 경우

    from fastapi import HTTPException

    raise HTTPException(status_code=404, detail=f"공고 ID {job_id}를 찾을 수 없습니다.")

# 작동 확인: uvicorn main:app --reload --port 8000