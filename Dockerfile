FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY index.html vite.config.ts tsconfig*.json tailwind.config.ts ./
COPY src/ ./src/
COPY public/ ./public/

RUN npm run build:docker

FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
