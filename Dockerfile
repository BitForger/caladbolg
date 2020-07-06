FROM node:12
WORKDIR /home/node

COPY package* ./
COPY tsconfig.json .

RUN npm install

COPY src ./src

RUN npm run build

CMD ["node","dist/main.js"]
