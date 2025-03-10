FROM node:22.11-alpine

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./tsconfig*.json ./
COPY ./libs/common/src ./libs/common/

RUN npm install -g pnpm && pnpm install

COPY ./apps/api-gateway/ .

EXPOSE 3001

CMD pnpm start:dev