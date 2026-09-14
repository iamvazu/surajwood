FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3005

CMD ["node", "dist/index.js"]
