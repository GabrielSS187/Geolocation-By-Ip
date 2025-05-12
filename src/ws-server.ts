import { WebSocketServer } from "ws";
import http from "http";
import { initGeoIP, getGeoData } from "./geoip";

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string"
    ? forwarded.split(",")[0].trim()
    : req.socket.remoteAddress || "127.0.0.1";

  const geoData = getGeoData(ip);

  const response = geoData
    ? {
        ip,
        country: geoData.country?.names?.en,
        city: geoData.city?.names?.en,
        latitude: geoData.location?.latitude,
        longitude: geoData.location?.longitude,
        timezone: geoData.location?.time_zone,
      }
    : { error: "Geolocation not found", ip };

  ws.send(JSON.stringify(response));
});

initGeoIP().then(() => {
  server.listen(3000, () => {
    console.log("✅ WebSocket universal rodando em ws://localhost:3000");
  });
});
