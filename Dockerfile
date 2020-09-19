FROM node:12
WORKDIR /home/node

COPY package.json .
COPY yarn.lock .
COPY .prettierrc .
COPY tsconfig.json .
COPY nest-cli.json .

RUN npm install

COPY src ./src

RUN npm run build

CMD ["node","dist/main.js"]
