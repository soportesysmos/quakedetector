const express = require("express");
const mqtt = require("mqtt");

const app = express();
const PORT = process.env.PORT || 10000;

// Cliente MQTT
const client = mqtt.connect("mqtt://test.mosquitto.org:1883");

client.on("connect", () => {
  console.log("✅ MQTT conectado a test.mosquitto.org");
  client.subscribe("esp8266/alert", (err) => {
    if (!err) console.log("📡 Suscrito a esp8266/alert");
  });
});

client.on("message", (topic, message) => {
  console.log(`⚠️ Alerta recibida: ${message.toString()}`);
});

// Endpoint HTTP para Render
app.get("/", (req, res) => {
  res.send("Servidor MQTT en Render funcionando 🚀");
});

app.listen(PORT, () => {
  console.log(`🌍 Servidor escuchando en puerto ${PORT}`);
});
