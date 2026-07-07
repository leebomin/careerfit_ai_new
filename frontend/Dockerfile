# 1단계: 빌드 스테이지
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

# 🟢 [Render Docker 빌드 트랩 탈출구]
# Render가 주는 환경변수를 빌드 환경(VITE_...)으로 완벽히 치환 주입합니다.
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY . .
RUN npm run build

# 2단계: 실행/서빙 스테이지
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]