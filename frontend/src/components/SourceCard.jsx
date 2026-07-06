// frontend/src/components/SourceCard.jsx

function SourceCard({ sources }) {
  if (!sources || sources.length === 0) {
    return <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-500">참고한 공고 데이터가 없습니다.</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-700 mb-3">📄 참고한 공고 출처</h2>
      <div className="space-y-3">
        {sources.map((source, index) => (
          <div key={index} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
            {/* ------------------------------------------------------------------
              * [변경 및 추가] 1. 제목 및 유형 뱃지 (Type)
              * design-skill.md 규칙에 명시된 'type'을 발표자가 알아보기 쉽게 
              * 텍스트 우측에 세련된 형태의 뱃지(Badge) 스타일로 추가함
              * ------------------------------------------------------------------ */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <p className="text-sm font-medium text-slate-700">
                {source.company} — {source.title}
              </p>
              {source.type && (
                <span className="text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full uppercase">
                  {source.type}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 mt-1">필수 스킬: {source.required_skills || "정보 없음"}</p>

            {/* ------------------------------------------------------------------
              * [추가] 2. 매칭 사유 (Matched Reason) 영역
              * design-skill.md의 핵심 요구사항인 'matched_reason' 데이터를 바인딩하여,
              * 이 공고가 왜 분석의 확실한 근거가 되었는지 청중에게 명확히 설명할 수 있도록 표기함
              * ------------------------------------------------------------------ */}
            {source.matched_reason && (
              <div className="mt-2 bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-700">💡 매칭 근거:</span> {source.matched_reason}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SourceCard;