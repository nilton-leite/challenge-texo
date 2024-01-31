FROM node:18

WORKDIR /challenge-objective

COPY package.json .

RUN yarn install

COPY . .

#RUN yarn migrate-mongo up

EXPOSE 3333

CMD yarn start