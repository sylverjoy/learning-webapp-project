FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install sequelize pg pg-hstore
COPY . .
EXPOSE 3000

RUN npm run build  

CMD ["node", "./dist/app.js"] 