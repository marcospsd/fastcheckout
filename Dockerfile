FROM node

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . ./

RUN npm run biuld

EXPOSE 80

CMD ["serve", "-s", "biuld", "-l", "80"]