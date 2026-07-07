// 프론트엔드 공통 API 설정 파일

// 🟢 현재 켜진 창의 도메인을 보고 자동으로 주소를 스위칭하는 코드입니다.
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const API_BASE_URL = isLocal 
    ? "http://localhost:8000" 
    : "https://careerfit-ai-2jxp.onrender.com"; // 👈 여기에 형님의 진짜 Render 백엔드 주소를 입력해 주세요!

/**
 * 전역 API 호출 헬퍼 함수
 */
async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error (${response.status}): ${errorText}`);
    }
    
    return response.json();
}

// 명세서에 명시된 필수 API 호출 연동 함수 목록
export const api = {
    checkHealth: () => request("/health"),
    getJobs: () => request("/jobs"),
    analyzeCareer: (payload) => request("/analyze", {
        method: "POST",
        body: JSON.stringify(payload)
    })
};