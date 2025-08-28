import express from "express";
import mqtt from "mqtt";

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión al broker MQTT
const client = mqtt.connect("mqtt://test.mosquitto.org:1883");

client.on("connect", () => {
  console.log("✅ Conectado a test.mosquitto.org");
  client.subscribe("esp8266/alert", (err) => {
    if (!err) {
      console.log("📡 Suscrito al tópico esp8266/alert");
    } else {
      console.error("❌ Error al suscribirse:", err);
    }
  });
});

// Manejo de mensajes
client.on("message", (topic, message) => {
  console.log(`📩 Mensaje recibido en ${topic}: ${message.toString()}`);
});

// Endpoint básico para Render
app.get("/", (req, res) => {
  res.send("Servidor MQTT Listener en Render está funcionando 🚀");
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor web escuchando en puerto ${PORT}`);
});
