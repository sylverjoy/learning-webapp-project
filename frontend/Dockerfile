# Etape de construction
FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install --save-dev @angular-devkit/build-angular
RUN npm install -g @angular/cli
RUN npm install
COPY . .
EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
