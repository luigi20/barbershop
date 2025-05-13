# Etapa de build
FROM node:20-alpine AS builder
#WORKDIR /Documentos/projetos/docker_test
WORKDIR /var/www/barbershop
RUN apk add --no-cache openssl
COPY prisma ./prisma
COPY package*.json ./

RUN npm install 
RUN npx prisma generate
COPY . .

EXPOSE 3333

CMD npx prisma migrate dev