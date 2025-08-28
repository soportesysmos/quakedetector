import mqtt from "mqtt";
import express from "express";

// Configuración HiveMQ Cloud WSS
const MQTT_BROKER = "wss://8154b54566104801bad4e348282b332f.s1.eu.hivemq.cloud:8884/mqtt"; // Reemplaza con tu host
const MQTT_TOPIC = "esp8266/alert";

const options = {
  username: "sysmos", // Reemplaza con tu usuario HiveMQ Cloud
  password: "A25495039c", // Reemplaza con tu password HiveMQ Cloud
  reconnectPeriod: 1000 // Reconexión automática cada 1 segundo
};

// Conectar al broker
const client = mqtt.connect(MQTT_BROKER, options);

client.on("connect", () => {
  console.log("✅ Conectado a HiveMQ Cloud via WebSocket");
  client.subscribe(MQTT_TOPIC, (err) => {
    if (!err) console.log(`📡 Suscrito al tópico: ${MQTT_TOPIC}`);
    else console.error("❌ Error al suscribirse:", err);
  });
});

client.on("message", (topic, message) => {
  console.log(`⚠️ Alerta recibida en tópico ${topic}: ${message.toString()}`);
});

client.on("error", (err) => console.error("❌ Error MQTT:", err));

// Express mínimo para mantener Render activo
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Servidor MQTT Listener activo ✅"));
app.listen(PORT, () => console.log(`HTTP escuchando en puerto ${PORT}`));
