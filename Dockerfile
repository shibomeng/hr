FROM node:10

WORKDIR /usr/src/app

VOLUME [ "/Users/shibomeng/Desktop/SelfLearning/Web/source_code" ]

COPY package*.json ./

COPY ./Server-Docker/wait-for-it.sh ./

# RUN chmod +x wait-for-it.sh

RUN npm install

COPY . .

ENV PORT=80

EXPOSE 80

CMD [ "npm", "start" ]