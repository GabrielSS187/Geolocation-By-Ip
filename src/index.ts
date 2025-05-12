import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { initGeoIP, getGeoData } from "./geoip";

const app = express();
const port = 8181;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static("public"));

wss.on("connection", (ws, req) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string"
    ? forwarded.split(",")[0].trim()
    : req.socket.remoteAddress || "127.0.0.1";

  const geoData = getGeoData(ip);

  const location = geoData
    ? {
        ip,
        country: geoData.country?.names?.en,
        city: geoData.city?.names?.en,
        latitude: geoData.location?.latitude,
        longitude: geoData.location?.longitude,
        timezone: geoData.location?.time_zone,
      }
    : { error: "Geolocation not found", ip };

  ws.send(JSON.stringify(location));
});

initGeoIP().then(() => {
  server.listen(port, () => {
    console.log(`✅ Servidor WebSocket universal rodando em ws://localhost:${port}`);
    console.log(`🌐 Endpoint HTTP disponível em http://localhost:${port}/api/geoip`);
  });
});
