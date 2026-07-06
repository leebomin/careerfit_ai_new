# CareerFit AI UI 디자인 지침 (design-skill.md)

## 1. 목적 및 디자인 목표
*   **목적:** CareerFit AI React UI를 취업·공모전 데이터 기반 AI 포트폴리오 코치처럼 보이게 만든다.
*   **디자인 목표:**
    *   신뢰감 있는 AI 코치 서비스 구축
    *   발표 화면에서 한눈에 이해되는 구조
    *   입력, 분석 결과, 출처, 신뢰도가 분리된 화면
    *   과도하게 화려하기보다 설명 가능한 디자인

---

## 2. 컬러 팔레트 (Color Palette)

- **primary:** `#3B82F6` (파란색 — 신뢰, 전문성)
- **secondary:** `#10B981` (초록색 — 성장, 추천)
- **background:** `#F8FAFC` (연한 회색 — 밝고 단순하게)
- **text-primary:** `#1E293B`
- **text-muted:** `#64748B`
- **border:** `#E2E8F0`
- **강조 컬러:** `matched_skills`, `confidence`, `sources` 영역에 하이라이트 적용
- **경고 (error 상태):** `red` 계열 시스템 활용 (`#EF4444`)
- **주의 (low confidence 상태):** `yellow` 또는 `amber` 계열 시스템 활용 (`#F59E0B`)

---

## 3. 타이포그래피 (Typography)

- **제목:** `text-2xl font-bold text-slate-800`
- **소제목:** `text-lg font-semibold text-slate-700`
- **본문:** `text-base text-slate-600`
- **설명:** `text-sm text-slate-500`

---

## 4. 컴포넌트 구조 및 화면 설계

모든 파일은 독립적으로 관리하며, 하얀 화면 버그 방지를 위해 **파일 맨 아랫줄에는 반드시 `export default 컴포넌트명;`을 명시**합니다.

### 📦 App.jsx
*   최상위 컴포넌트, 프로젝트 전체 상태 관리, API 요청 수행.
*   **Header 필수 포함:**
    *   서비스명: `CareerFit AI`
    *   한 줄 설명: `취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치`

### 📥 InputForm.jsx
*   전공·스킬·직무 입력 폼 컴포넌트.
*   **필수 입력 항목:** 전공 입력, 보유 스킬 입력, 관심 직무 입력, 분석 버튼.

### 📄 ResultCard.jsx
*   AI 분석 답변 출력 컴포넌트. 
*   **디자인 규칙:** 신뢰감을 주는 **초록 왼쪽 테두리(`border-l-4 border-emerald-500`)** 적용.
*   **필수 출력 데이터:** `answer`, `matched_skills`, `missing_skills`, `recommended_projects`, `confidence`

### 🔗 SourceCard.jsx
*   출처 공고 목록 출력 컴포넌트.
*   **필수 출력 데이터:** `sources` 목록, `title`, `type`, `matched_reason`

---

## 5. UI 상태 처리 규칙 (State Handling)

반드시 코드로 구현하고 화면상에서 명확히 구분해야 하는 5가지 상태:

1.  **empty:** 아직 분석 전 상태 (안내 문구 표시)
2.  **loading:** 분석 요청 중 상태 (버튼 비활성화 및 로딩 표시)
3.  **success:** 결과 표시 성공 상태
4.  **error:** 요청 실패 상태 (`red` 계열 경고 표시)
5.  **no sources:** `sources`가 비어 있음 상태 (숨기지 않고 데이터가 없다는 명확한 안내문 표시)

---

## 6. 레이아웃 규칙

- **최대 너비:** `max-w-2xl mx-auto` (중앙 정렬)
- **카드 내부 여백:** `p-6`
- **컴포넌트 간격:** `gap-4` / `space-y-4`
- **모서리:** `rounded-xl` (외곽 카드), `rounded-lg` (버튼 및 입력창)

---

## 7. 금지 사항 (Restrictions)

*   ❌ **정보 은닉 금지:** `sources`를 화면에서 숨기지 않는다.
*   ❌ **신뢰도 누락 금지:** `confidence`를 완전히 생략하지 않는다.
*   ❌ **과도한 연출 금지:** 과도한 애니메이션을 넣지 않는다.
*   ❌ **허위 정보 금지:** 실제 없는 채용 정보처럼 보이게 꾸미지 않는다.
*   ❌ **보안 위험 금지:** React 코드(화면)에 API Key를 넣거나 `localStorage`에 민감한 키를 저장하지 않는다.
*   ❌ **가독성 저해 금지:** 다크 배경에 흰 텍스트 구성을 금지한다 (가독성 우선).
*   ❌ **직관성 저해 금지:** 아이콘 없이 버튼만 사용하지 않는다 (반드시 텍스트 레이블 필수 기입).
*   ❌ **익스포트 누락 금지:** 파일 맨 밑에 `export default` 구문을 빼먹어 화면이 새하얗게 변하는 버그를 원천 차단한다.

---

## 8. 발표용 기준 (Presentation Standard)

발표자가 화면을 보며 청중에게 다음 4가지를 명확히 설명할 수 있어야 한다.

1.  사용자가 무엇을 입력하는가?
2.  AI가 어떤 분석 결과를 주는가?
3.  어떤 공고 또는 데이터가 근거인가?
4.  신뢰도가 높거나 낮은 이유는 무엇인가?