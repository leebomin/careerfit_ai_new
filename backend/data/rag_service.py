# backend/services/rag_service.py

import chromadb
import json
import os
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
CHROMA_PATH = str(BASE_DIR / "chroma_db")
RAG_JSON = str(BASE_DIR / "data" / "rag_documents.json")

client = chromadb.PersistentClient(path=CHROMA_PATH)


def get_or_create_collection() -> chromadb.Collection:
    """
    ChromaDB 컬렉션을 가져오거나, 비어있으면 RAG 문서를 로드합니다.
    요리 비유: 레시피 북을 열고, 비어있으면 레시피 카드를 채워넣습니다.
    """
    collection = client.get_or_create_collection(
        name="careerfit_jobs",
        metadata={"description": "CareerFit AI 취업·공모전 데이터"}
    )

    if collection.count() == 0:
        print("⚠️  ChromaDB가 비어있습니다. RAG 문서를 다시 저장합니다...")
        _load_documents(collection)

    return collection


def _load_documents(collection: chromadb.Collection) -> None:
    """rag_documents.json에서 문서를 읽어 ChromaDB에 저장합니다."""
    with open(RAG_JSON, "r", encoding="utf-8") as f:
        documents = json.load(f)

    # 🔴 [보완] 혹시 모를 중복 ID 에러 방지를 위한 안전한 ID 생성 메커니즘
    safe_ids = []
    for i, doc in enumerate(documents):
        doc_id = doc.get("doc_id", "")
        # ID가 비어있거나 "job_"로만 되어있어 겹칠 위협이 있다면 인덱스를 붙여 고유화
        if doc_id == "job_" or not doc_id:
            safe_ids.append(f"job_{i}")
        else:
            safe_ids.append(doc_id)

    collection.add(
        documents=[doc["text"] for doc in documents],
        metadatas=[doc["metadata"] for doc in documents],
        ids=safe_ids
    )
    print(f"✅ {collection.count()}개 문서 저장 완료")


def search_documents(query: str, n_results: int = 3) -> list:
    """
    사용자 질문과 의미적으로 유사한 문서를 ChromaDB에서 검색합니다.

    Args:
        query: 사용자 질문 텍스트
        n_results: 반환할 문서 수 (기본값 3)

    Returns:
        [{"text": str, "metadata": dict, "distance": float}, ...]
    """
    collection = get_or_create_collection()
    
    total_count = collection.count()
    if total_count == 0:
        return []  # DB에 데이터가 없으면 즉시 빈 리스트 반환하여 IndexError 방지

    results = collection.query(
        query_texts=[query],
        n_results=min(n_results, total_count)
    )

    # 🔴 [보완] 결과가 비어있거나 검색 결과 리스트가 깨져있을 경우 방어 처리
    if not results or not results.get("documents") or not results["documents"][0]:
        return []

    return [
        {
            "text": text,
            "metadata": metadata,
            "distance": round(distance, 4)
        }
        for text, metadata, distance in zip(
            results["documents"][0],
            results["metadatas"][0],
            results["distances"][0]
        )
    ]