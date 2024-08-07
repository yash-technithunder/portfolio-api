FROM node:22-alpine

WORKDIR /app/code/src

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8004

CMD ["npm","run","dev"]


