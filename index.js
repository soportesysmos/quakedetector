import mqtt from "mqtt";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Servidor HTTP mínimo para Render
app.get("/", (req, res) => {
  res.send("Servidor MQTT Listener corriendo ✅");
});

app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en puerto ${PORT}`);
});

// --- MQTT ---
const MQTT_BROKER = "mqtt://test.mosquitto.org:1883";
const MQTT_TOPIC = "alerta/test";

const client = mqtt.connect(MQTT_BROKER);

client.on("connect", () => {
  console.log("Conectado al broker MQTT");
  client.subscribe(MQTT_TOPIC, (err) => {
    if (!err) console.log(`Suscrito al tópico: ${MQTT_TOPIC}`);
    else console.error("Error al suscribirse:", err);
  });
});

client.on("message", (topic, message) => {
  console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
});

client.on("error", (err) => {
  console.error("Error de conexión MQTT:", err);
});
