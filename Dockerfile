FROM node:18.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

COPY ./src/adapters/notification/templates ./dist/src/adapters/notification/templates

EXPOSE 3000

CMD ["npm", "run", "start:prod"]