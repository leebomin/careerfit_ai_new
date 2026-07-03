# backend/services/llm_service.py

import os
from dotenv import load_dotenv

# .env 파일에서 환경변수를 읽어온다
load_dotenv()

# mock mode 설정: .env의 MOCK_MODE=true 이면 Gemini를 호출하지 않는다
MOCK_MODE = os.getenv("MOCK_MODE", "false").lower() == "true"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def get_llm_response(query: str, context_docs: list) -> dict:
    """
    사용자 질문과 검색된 문서를 받아 LLM 응답을 반환한다.

    Args:
        query: 사용자 질문 (예: "데이터 분석가가 되려면 뭘 준비해야 하나요?")
        context_docs: RAG로 검색된 관련 문서 목록 (3일차에 ChromaDB에서 가져옴)

    Returns:
        {"answer": str, "sources": list}
    """
    if MOCK_MODE:
        # mock mode: Gemini API를 호출하지 않고 미리 정의된 응답을 반환한다
        # API Key가 없거나 한도 초과 시 이 모드로 전환한다
        return {
            "answer": (
                "[MOCK 응답] 이것은 테스트용 응답입니다. "
                f"질문: '{query}'에 대한 실제 Gemini 응답은 "
                "MOCK_MODE=false 로 설정하면 받을 수 있습니다."
            ),
            "sources": [
                {"title": "mock 데이터", "content": "mock 출처 내용"}
            ]
        }

    # 실제 Gemini API 호출 코드: 실습 8에서 작성
    # 지금은 placeholder로 남겨둔다
    return {
        "answer": "Gemini API 연결 전입니다. 실습 8에서 구현합니다.",
        "sources": []
    }