import { useState } from "react";

function InputForm({ onSubmit, isLoading }) {
  const [major, setMajor] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [jobType, setJobType] = useState("");

  function handleSubmit() {
    // 쉼표로 구분된 스킬들의 공백을 지우고 배열로 정제
    const skills = skillsInput.split(",").map(s => s.trim()).filter(Boolean);
    onSubmit({ major, skills, jobType });
  }

  // 폼 유효성 검사 (모든 항목이 입력되었는지 확인)
  const isFormValid = major.trim() && skillsInput.trim() && jobType.trim();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      {/* 디자인 가이드라인: 소제목 타이포그래피 규칙 반영 */}
      <h2 className="text-lg font-semibold text-slate-700 mb-4">내 정보 입력</h2>
      
      <div className="space-y-4">
        {/* 전공 입력 피드 */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">전공</label>
          <input 
            type="text" 
            value={major} 
            onChange={e => setMajor(e.target.value)}
            placeholder="예: 통계학과"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        {/* 보유 스킬 입력 피드 */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">보유 스킬 (쉼표 구분)</label>
          <input 
            type="text" 
            value={skillsInput} 
            onChange={e => setSkillsInput(e.target.value)}
            placeholder="예: Python, SQL, R"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <p className="text-sm text-slate-500 mt-1">※ 여러 개인 경우 쉼표(,)로 구분해서 입력해 주세요.</p>
        </div>

        {/* 관심 직무 입력 피드 */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">관심 직무</label>
          <input 
            type="text" 
            value={jobType} 
            onChange={e => setJobType(e.target.value)}
            placeholder="예: 데이터 분석"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        {/* 분석 버튼: 디자인 금지 사항 준수 (아이콘 단독 금지, 레이블 텍스트 필수 포함) */}
        <button 
          onClick={handleSubmit}
          disabled={isLoading || !isFormValid}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">🔄</span>
              <span>AI 코치가 데이터를 분석 중입니다...</span>
            </>
          ) : (
            <>
              <span>📊</span>
              <span>역량 분석 요청</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ⚠️ 하얀 화면 차단을 위한 익스포트 규칙 고수
export default InputForm;