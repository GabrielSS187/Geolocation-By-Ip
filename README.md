# 🌍 Geolocation by IP

Um projetinho simples com **Node.js**, **Express** e **WebSocket** para detectar a **localização geográfica baseada no IP** do usuário. Criado com o objetivo de estudar como funciona o processo de geolocalização utilizando a base de dados **GeoLite2** da MaxMind.

## 📌 O que esse projeto faz?

- Lê o IP do cliente ao se conectar via WebSocket.
- Consulta um banco local (`GeoLite2-City.mmdb`) para obter informações como país, cidade, latitude, longitude e fuso horário.
- Retorna essas informações em tempo real ao cliente conectado.

---

## 🧱 Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- WebSocket (`ws`)
- MaxMind GeoLite2
- Docker

---

## 🚀 Como rodar o projeto

### ⚙️ Pré-requisitos

- Node.js v18 ou superior
- Docker (opcional)

### 🧪 Rodando localmente

```bash
# Instale as dependências
npm install

# Rode em modo desenvolvimento
npm run dev

# Ou build e start
npm run build
npm start
```

### 🐳 Usando Docker

#### Construa e suba o container

```bash
docker compose up --build
```

A aplicação estará acessível em:

- HTTP: http://localhost:8181
- WebSocket: ws://localhost:8181

### Headers Exemplo
```json
x-forwarded-for: 8.8.8.8
```

### 📡 Exemplo de resposta via WebSocket

```json
{
  "ip": "187.10.25.14",
  "country": "Brazil",
  "city": "São Paulo",
  "latitude": -23.5505,
  "longitude": -46.6333,
  "timezone": "America/Sao_Paulo"
}
```

## 📁 Estrutura do projeto

```graphql
src/
├── geoip.ts         # Lógica de inicialização e leitura da base GeoLite2
├── index.ts         # Servidor Express com WebSocket
├── ws-server.ts     # Variante com WebSocket puro
GeoLite2-City.mmdb   # Banco local de IP -> localização
Dockerfile
docker-compose.yml
```

## ⚠️ Observação
A base GeoLite2-City.mmdb da MaxMind não pode ser redistribuída publicamente por questões de licença. Você pode baixá-la gratuitamente criando uma conta em:
👉 https://dev.maxmind.com/geoip/geolite2-free-geolocation-data

## 💡 Motivação
Esse projeto foi feito para fins de estudo e exploração prática de conceitos como:

- Geolocalização via IP

- WebSockets em Node.js

- Integração com banco binário de dados (MaxMind)

- Deploy com Docker