# node 16 LTS 버전
FROM node:20

# 앱 디렉토리
WORKDIR /app

# 의존성 설치
COPY package*.json ./

RUN npm install

# 앱 소스 추가
COPY . .

EXPOSE 5002

# pm2를 foreground로 실행 및 run 시 클러스터 인자 받기
CMD ["npm", "run", "start:dev"]