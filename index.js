import express from "express";
import mqtt from "mqtt";

const app = express();
const PORT = process.env.PORT || 3000;

// Servidor HTTP mínimo para mantener Render activo
app.get("/", (req, res) => res.send("Servidor MQTT Listener activo ✅"));
app.listen(PORT, () => console.log(`HTTP escuchando en puerto ${PORT}`));

// Config HiveMQ Cloud
const MQTT_BROKER = "mqtt://broker.hivemq.cloud:1883";
const MQTT_TOPIC = "esp8266/alert";
const options = {
  username: "sysmos",
  password: "A25495039c",
  reconnectPeriod: 1000
};

const client = mqtt.connect(MQTT_BROKER, options);

client.on("connect", () => {
  console.log("✅ Conectado a HiveMQ Cloud");
  client.subscribe(MQTT_TOPIC, (err) => {
    if (!err) console.log(`📡 Suscrito al tópico: ${MQTT_TOPIC}`);
    else console.error("❌ Error al suscribirse:", err);
  });
});

client.on("message", (topic, message) => {
  console.log(`⚠️ Alerta recibida: ${message.toString()}`);
});

client.on("error", (err) => console.error("❌ Error MQTT:", err));
