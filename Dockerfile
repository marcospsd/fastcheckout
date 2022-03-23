FROM node

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent

COPY . ./

EXPOSE 80

CMD ["serve", "-s", "biuld", "-l", "80"]