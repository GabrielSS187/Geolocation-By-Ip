FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:24-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

COPY --from=builder /app/GeoLite2-City.mmdb ./

RUN npm install --only=production

EXPOSE 8181
CMD ["node", "dist/index.js"]
