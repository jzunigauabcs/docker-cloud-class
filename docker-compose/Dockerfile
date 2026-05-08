FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
