FROM node

WORKDIR /usr/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 80

ENTRYPOINT serve -s biuld -l 80