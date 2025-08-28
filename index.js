import mqtt from "mqtt";
import express from "express";

const MQTT_BROKER = "wss://8154b54566104801bad4e348282b332f.s1.eu.hivemq.cloud:8884/mqtt";
const MQTT_TOPIC = "esp8266/alert";
const WINDOW_MS = 2000; // 2 segundos
const MIN_ALERTS = 2;

const options = {
  username: "sysmos",
  password: "A25495039c",
  reconnectPeriod: 1000,
  protocol: "wss"
};

const client = mqtt.connect(MQTT_BROKER, options);

// Buffer de alertas: { id, timestamp }
let alertBuffer = [];

client.on("connect", () => {
  console.log("✅ Conectado a HiveMQ Cloud via WSS");
  client.subscribe(MQTT_TOPIC, { qos: 1 }, (err) => {
    if (!err) console.log(`📡 Suscrito al tópico: ${MQTT_TOPIC}`);
    else console.error("❌ Error al suscribirse:", err);
  });
});

client.on("message", (topic, message) => {
  const payload = JSON.parse(message.toString());
  const now = Date.now();

  // Agrega alerta al buffer
  alertBuffer.push({ id: payload.id, timestamp: now });

  // Limpia alertas antiguas
  alertBuffer = alertBuffer.filter(a => now - a.timestamp <= WINDOW_MS);

  // Verifica si hay al menos N alertas únicas
  const uniqueAlerts = [...new Set(alertBuffer.map(a => a.id))];
  if (uniqueAlerts.length >= MIN_ALERTS) {
    console.log(`⚠️ ALERTA COLECTIVA: ESPs detectados: ${uniqueAlerts.join(", ")}`);
    // Limpiar buffer para no disparar varias veces la misma alerta
    alertBuffer = [];
  }
});

// Express para Render
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Servidor MQTT Listener activo ✅"));
app.listen(PORT, () => console.log(`HTTP escuchando en puerto ${PORT}`));
