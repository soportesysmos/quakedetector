import express from "express";
import mqtt from "mqtt";

const app = express();
const PORT = process.env.PORT || 3000;

// Servidor HTTP mínimo para que Render mantenga el contenedor activo
app.get("/", (req, res) => res.send("Servidor MQTT Listener activo ✅"));
app.listen(PORT, () => console.log(`HTTP escuchando en puerto ${PORT}`));

// Configuración HiveMQ Cloud
const MQTT_BROKER = "wss://broker.hivemq.cloud:8884/mqtt";
const MQTT_TOPIC = "esp8266/alert";

const options = {
  username: "sysmos",      // reemplaza con tu usuario HiveMQ
  password: "A25495039c",     // reemplaza con tu password HiveMQ
  reconnectPeriod: 1000         // reconexión automática cada 1s
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
