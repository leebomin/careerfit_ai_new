from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Literal
from services.llm_service import get_llm_response #추가

router = APIRouter()


# 요청 본문(Request Body) 모델
class AnalyzeRequest(BaseModel):
    major: str          # 전공
    skills: List[str]   # 보유 스킬 목록
    job_type: str       # 관심 직무

    experience_years: int = 0 #경력 년수
    preferred_company_size: Literal["무관", "대기업", "중견기업", "중소기업", "스타트업", "외국계"] = "무관"
    # preferred_company_size: str = "무관"

# 응답 본문(Response Body) 모델
class AnalyzeResponse(BaseModel):
    answer: str
    sources: List[dict]


@router.post("/analyze", response_model=AnalyzeResponse, tags=["Analyze"])
def analyze_career(request: AnalyzeRequest):
    # 사용자 질문 구성
    query = (
        f"전공: {request.major}, "
        f"보유 스킬: {', '.join(request.skills)}, "
        f"관심 직무: {request.job_type}"
    )

    # llm_service 호출 (실습 8에서 Gemini + RAG로 교체)
    result = get_llm_response(query=query, context_docs=[])

    return AnalyzeResponse(
        answer=result["answer"],
        sources=result["sources"]
    )
