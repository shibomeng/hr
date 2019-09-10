FROM node:10

VOLUME [ "/" ]

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./Server-Docker/wait-for-it.sh ./

# RUN chmod +x wait-for-it.sh

RUN npm install

COPY . .

CMD [ "npm", "start" ]