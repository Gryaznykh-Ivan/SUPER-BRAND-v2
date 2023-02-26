FROM node:18

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

CMD node dist/src/main.js