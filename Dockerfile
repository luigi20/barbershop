FROM node:20-alpine AS builder

WORKDIR /var/www/barbershop

RUN apk add --no-cache openssl

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

# Adiciona o tsconfig (necessário para o build funcionar)
COPY tsconfig*.json ./

# Compila o projeto NestJS
RUN yarn build

# Fase final
FROM node:20-alpine

WORKDIR /var/www/barbershop

COPY --from=builder /var/www/barbershop/dist ./dist
COPY --from=builder /var/www/barbershop/node_modules ./node_modules
COPY --from=builder /var/www/barbershop/package.json ./
COPY .env

CMD ["node", "dist/main"]
