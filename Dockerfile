FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm install contracts-green-shop@latest

COPY . .

RUN npm run build

FROM nginx:latest AS prod

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
