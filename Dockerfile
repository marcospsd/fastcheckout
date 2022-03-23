FROM node

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . ./

RUN npm run build

EXPOSE 80

ENTRYPOINT serve -s build -l 80