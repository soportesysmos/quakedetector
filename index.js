const mqtt = require("mqtt");

// Conexión al broker MQTT público (puedes usar tu propio broker)
const brokerUrl = "mqtt://test.mosquitto.org";
const topic = "alertas/esp8266";

// Crear cliente MQTT
const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("✅ Conectado al broker MQTT:", brokerUrl);

  // Suscribirse al tópico
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log("📡 Suscrito al tópico:", topic);
    } else {
      console.error("❌ Error al suscribirse:", err);
    }
  });
});

// Mostrar los mensajes recibidos
client.on("message", (topic, message) => {
  console.log("🚨 Alerta recibida en", topic, ":", message.toString());
});

// Mantener un pequeño servidor HTTP para que Render no cierre el servicio
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Servidor MQTT Listener activo 🚀"));
app.listen(process.env.PORT || 3000, () =>
  console.log("🌍 Servidor web activo en Render")
);
