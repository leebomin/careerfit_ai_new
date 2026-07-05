# backend/data/preprocess.py

# 데이터 전처리 파이프라인

# 실행: backend/ 폴더에서 실행

python data/preprocess.py

import pandas as pd

import sqlite3

import json

import os



# ─── 1. 파일 경로 설정 

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

JOBS_CSV = os.path.join(BASE_DIR, "jobs.csv")

DB_PATH = os.path.join(BASE_DIR, "careerfit.db")

RAG_JSON = os.path.join(BASE_DIR, "rag_documents.json")



# ─── 2. CSV 읽기 

def load_data(filepath: str) -> pd.DataFrame:

    """

    CSV 파일을 읽어 DataFrame으로 반환합니다.

    인코딩 오류가 발생하면 cp949로 재시도합니다.

    """

    try:

        df = pd.read_csv(filepath, encoding="utf-8")

        print(f"✅ 파일 읽기 성공 (UTF-8): {filepath}")

    except UnicodeDecodeError:

        df = pd.read_csv(filepath, encoding="cp949")

        print(f"✅ 파일 읽기 성공 (CP949): {filepath}")

    print(f"   행 수: {len(df)}, 열 수: {len(df.columns)}")

    print(f"   컬럼: {df.columns.tolist()}")

    return df



# 실행 테스트

if __name__ == "__main__":

 df_jobs = load_data(JOBS_CSV)

 print()

 print("=== 처음 3행 미리보기 ===")

 print(df_jobs.head(3).to_string())


#빈 값과 중복 확인
def check_missing(df: pd.DataFrame) -> pd.DataFrame:

    """

    각 컬럼의 결측치(빈값) 수와 비율을 확인합니다.

    요리 비유: 재료 중 빠진 것이 있는지 확인하는 단계입니다.

    """

    print("\n=== 결측치 확인 ===")

    missing = df.isnull().sum()

    missing_pct = (df.isnull().sum() / len(df) * 100).round(1)

    result = pd.DataFrame({

        "결측치 수": missing,

        "결측치 비율(%)": missing_pct

    })

    print(result[result["결측치 수"] > 0])  # 결측치 있는 컬럼만 출력

    if missing.sum() == 0:

        print("   ✅ 결측치 없음")

    else:

        print(f"   ⚠️  총 {missing.sum()}개 결측치 발견")

    return df


# 표준화 사전: 왼쪽 → 오른쪽으로 변환합니다
# 스킬 키워드 표준화
SKILL_NORMALIZATION = {

    "python": "Python",

    "sql": "SQL",

    "ai": "AI",

    "ml": "머신러닝",

    "machine learning": "머신러닝",

    "deep learning": "딥러닝",

    "r": "R",         # 대소문자 주의

    "js": "JavaScript",

    "javascript": "JavaScript",

    "tableau": "Tableau",

    "powerbi": "Power BI",

    "power bi": "Power BI",

}

def normalize_skills(skills_str: str) -> str:

    """

    스킬 키워드 문자열을 표준화합니다.

    입력: "python, sql, Machine Learning"

    출력: "Python, SQL, 머신러닝"

    """

    if not isinstance(skills_str, str) or not skills_str.strip():

        return ""

    skills = [s.strip() for s in skills_str.split(",")]

    normalized = []

    for skill in skills:

        # 소문자로 변환해서 사전에서 찾기

        lower = skill.lower()

        # 사전에 있으면 표준화된 이름으로, 없으면 원래 값 유지

        normalized.append(SKILL_NORMALIZATION.get(lower, skill))

    return ", ".join(normalized)

def standardize_skills(df: pd.DataFrame) -> pd.DataFrame:

    """

    required_skills, preferred_skills 컬럼 전체에 표준화를 적용합니다.

    """

    print("\n=== 스킬 키워드 표준화 ===")

    for col in ["required_skills", "preferred_skills"]:

        if col in df.columns:

            df[col] = df[col].apply(normalize_skills)

    print(" ✅ 표준화 완료")

    # 표준화 결과 샘플 출력

    print("\n [표준화 전후 비교 샘플]")

    print(df[["title", "required_skills"]].head(3).to_string())

    return df

import sqlite3


#SQLite에 저장
def save_to_sqlite(df: pd.DataFrame, db_path: str) -> None:
    """
    전처리된 DataFrame을 SQLite 데이터베이스에 저장합니다.

    요리 비유:
    손질이 끝난 재료를 냉장고(SQLite)에 정리해서 넣는 단계입니다.
    """
    print(f"\n=== SQLite 저장 ===")

    conn = sqlite3.connect(db_path)

    # DataFrame을 SQL 테이블로 저장
    # if_exists="replace": 테이블이 이미 있으면 덮어씁니다
    df.to_sql("jobs", conn, if_exists="replace", index=False)

    # 저장 확인
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM jobs")
    count = cursor.fetchone()[0]

    print(f"   ✅ 저장 완료: jobs 테이블에 {count}행 저장됨")
    print(f"   파일 위치: {db_path}")

    conn.close()


#SQLite에서 조회
def query_sqlite(db_path: str) -> None:
    """
    SQLite에서 데이터를 조회해 저장 결과를 확인합니다.
    """
    print(f"\n=== SQLite 조회 테스트 ===")
    conn = sqlite3.connect(db_path)

    # 1. 전체 행 수
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM jobs")
    print(f"   전체 공고 수: {cursor.fetchone()[0]}개")

    # 2. 직무 분류별 개수
    print("\n   [직무 분류별 공고 수]")
    cursor.execute("""
        SELECT job_type, COUNT(*) as count
        FROM jobs
        GROUP BY job_type
        ORDER BY count DESC
    """)
    for row in cursor.fetchall():
        print(f"   - {row[0]}: {row[1]}개")

    # 3. Python 필수 스킬 공고만 조회
    print("\n   [Python이 필요한 공고]")
    cursor.execute("""
        SELECT company, title, required_skills
        FROM jobs
        WHERE required_skills LIKE '%Python%'
        LIMIT 3
    """)
    for row in cursor.fetchall():
        print(f"   - {row[0]} | {row[1]}")
        print(f"     스킬: {row[2]}")

    conn.close()