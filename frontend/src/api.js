// 프론트엔드 공통 API 설정 파일

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

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