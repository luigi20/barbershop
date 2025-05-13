# Etapa de build
FROM node:20-alpine AS builder
WORKDIR /Documentos/projetos/docker_test
RUN apk add --no-cache openssl
COPY prisma ./prisma
COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npx prisma generate
COPY . .

EXPOSE 3333

CMD npx prisma migrate dev