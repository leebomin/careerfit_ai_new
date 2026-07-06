// frontend/src/App.jsx
import { useState } from "react";
import InputForm from "./components/InputForm";
import ResultCard from "./components/ResultCard";
import SourceCard from "./components/SourceCard";

const API_BASE = "http://localhost:8000";
// ⚠️ API Key는 절대 여기에 넣지 않습니다

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAnalyze(formData) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          major: formData.major,
          skills: formData.skills,
          job_type: formData.jobType,
        }),
      });

      if (!response.ok) throw new Error(`서버 오류: ${response.status}`);
      const data = await response.json();
      setResult(data);

    } catch (err) {
      if (err.message.includes("Failed to fetch")) {
        setError("FastAPI 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.");
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header 영역 - 디자인 가이드라인 준수 */}
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CareerFit AI</h1>
        <p className="text-slate-500 text-sm mb-8">취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치</p>

        {/* 1단계 완료: 사용자 입력 폼 컴포넌트 */}
        <InputForm onSubmit={handleAnalyze} isLoading={isLoading} />

        {/* 💡 [UI 상태]: error - 요청 실패 시 Red 계열 경고창 노출 */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* 💡 [UI 상태]: loading - 데이터 분석 중 피드백 노출 */}
        {isLoading && (
          <div className="mt-8 text-center text-slate-500">
            🔄 AI 코치가 데이터를 분석 중입니다...
          </div>
        )}

        {/* ------------------------------------------------------------------
          * [추가] 1. empty 상태 처리
          * 분석 결과가 없고, 로딩 중도 아니고, 에러도 없는 '최초 진입 상태'일 때 안내 가이드 노출
          * ------------------------------------------------------------------ */}
        {!result && !isLoading && !error && (
          <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-sm shadow-sm">
            💡 전공, 스킬, 직무를 입력하고 버튼을 누르면 AI 코칭 분석이 시작됩니다.
          </div>
        )}

        {/* 💡 [UI 상태]: success - 결과 데이터 로드 성공 시 출력 */}
        {result && (
          <div className="mt-8 space-y-4">
            
            {/* ------------------------------------------------------------------
              * [수정] 2. 3단계 핵심 데이터 속성(Props) 연동 반영
              * design-skill.md 규칙에 명시된 모든 데이터(스킬, 프로젝트, 신뢰도)가 
              * 차후 ResultCard 화면에 정상적으로 표시되도록 백엔드 응답 키값 매핑 전달
              * ------------------------------------------------------------------ */}
            <ResultCard 
              answer={result.answer} 
              matchedSkills={result.matched_skills}
              missingSkills={result.missing_skills}
              recommendedProjects={result.recommended_projects}
              confidence={result.confidence}
            />
            
            {/* ------------------------------------------------------------------
              * [수정] 3. no sources 상태 세분화 처리
              * 디자인 시스템의 "sources를 숨기지 마라"는 규칙에 따라 
              * 데이터가 없을 때도 숨기지 않고 안내 문구를 명시적으로 출력함
              * ------------------------------------------------------------------ */}
            {result.sources && result.sources.length > 0 ? (
              <SourceCard sources={result.sources} />
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-sm text-slate-500 shadow-sm">
                ℹ️ 현재 입력하신 스킬 조합과 일치하는 공고 데이터가 데이터베이스에 존재하지 않습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;