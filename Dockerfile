FROM node as builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g npm@8.10.0 --silent

COPY . ./

RUN npm run build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]