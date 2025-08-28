import mqtt from "mqtt";
import express from "express";

// ----------------- CONFIGURACIÓN -----------------
const MQTT_BROKER = "wss://8154b54566104801bad4e348282b332f.s1.eu.hivemq.cloud:8884/mqtt"; // Reemplaza con tu host WSS
const MQTT_TOPIC = "esp8266/alert"; // Tópico exacto configurado en HiveMQ Cloud

const options = {
  username: "sysmos", // Usuario HiveMQ Cloud
  password: "A25495039c", // Password HiveMQ Cloud
  reconnectPeriod: 1000,   // Reconectar automáticamente cada 1s
  protocol: "wss"
};

// ----------------- CONEXIÓN MQTT -----------------
const client = mqtt.connect(MQTT_BROKER, options);

client.on("connect", () => {
  console.log("✅ Conectado a HiveMQ Cloud via WebSocket");

  // Suscribirse con QoS 1
  client.subscribe(MQTT_TOPIC, { qos: 1 }, (err, granted) => {
    if (!err) {
      console.log(`📡 Suscrito al tópico: ${MQTT_TOPIC}`);
      console.log("Granted:", granted);
    } else {
      console.error("❌ Error al suscribirse:", err);
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`⚠️ Alerta recibida en tópico ${topic}: ${message.toString()}`);
});

client.on("error", (err) => console.error("❌ Error MQTT:", err));

// ----------------- EXPRESS PARA RENDER -----------------
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Servidor MQTT Listener activo ✅"));

app.listen(PORT, () => console.log(`HTTP escuchando en puerto ${PORT}`));
