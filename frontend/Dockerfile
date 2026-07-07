# 1단계: 빌드 스테이지
FROM node:20-alpine AS builder
WORKDIR /app

# 의존성 파일 먼저 복사 및 캐싱 설치
COPY package*.json ./
RUN npm install

# 🟢 [수정 부분] Render 빌드 시점에 환경변수를 주입하기 위한 설정 추가
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# 전체 소스 코드 복사 후 빌드 실행
COPY . .
RUN npm run build

# 2단계: 실행/서빙 스테이지 (Nginx 경량 이미지 활용)
FROM nginx:stable-alpine
# 빌드 산출물(dist)을 Nginx 웹 루트 폴더로 이관
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 기본 80포트 오픈
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]