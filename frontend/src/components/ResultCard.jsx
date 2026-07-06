function ResultCard({ answer, matchedSkills = [], missingSkills = [], recommendedProjects = [], confidence }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border-l-4 border-emerald-500 p-6">
      <h2 className="text-lg font-semibold text-slate-700 mb-3">📊 AI 분석 결과</h2>
      
      {/* AI 코칭 답변 본문 */}
      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line mb-6">
        {answer}
      </p>

      {/* 분석 신뢰도 영역 */}
      {confidence && (
        <div className={`mt-4 p-3 rounded-lg text-sm font-medium flex items-center justify-between ${
          confidence.toLowerCase() === 'low' 
            ? 'bg-amber-50 text-amber-700 border border-amber-200' 
            : 'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          <span>🎯 AI 분석 신뢰도</span>
          <span className="uppercase font-bold px-2 py-0.5 bg-white rounded shadow-sm border">
            {confidence}
          </span>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 매칭된 핵심 역량 */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">🟢 매칭된 핵심 역량</h3>
          {matchedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {matchedSkills.map((skill, idx) => (
                <span key={idx} className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2 py-1 rounded-md border border-emerald-100">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">매칭된 스킬이 없습니다.</p>
          )}
        </div>

        {/* 보완이 필요한 스킬 */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">🟠 보완이 필요한 스킬</h3>
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {missingSkills.map((skill, idx) => (
                <span key={idx} className="text-xs bg-slate-200 text-slate-600 font-medium px-2 py-1 rounded-md">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-600 font-medium">필요한 역량을 모두 갖추었습니다!</p>
          )}
        </div>
      </div>

      {/* 역량 강화를 위한 추천 프로젝트 */}
      {recommendedProjects.length > 0 && (
        <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">🚀 역량 강화를 위한 추천 프로젝트</h3>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            {recommendedProjects.map((project, idx) => (
              <li key={idx} className="leading-relaxed">{project}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResultCard;