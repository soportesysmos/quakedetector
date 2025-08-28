// server.js
const express = require("express");
const mqtt = require("mqtt");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del broker MQTT (mosquitto público)
const MQTT_BROKER = "mqtt://test.mosquitto.org:1883";
const TOPIC = "esp8266/alerta";

// Conectar al broker MQTT
const client = mqtt.connect(MQTT_BROKER);

client.on("connect", () => {
  console.log("Conectado al broker MQTT:", MQTT_BROKER);
  client.subscribe(TOPIC, (err) => {
    if (!err) {
      console.log("Suscrito al tópico:", TOPIC);
    } else {
      console.error("Error al suscribirse:", err);
    }
  });
});

// Manejar mensajes entrantes
client.on("message", (topic, message) => {
  console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
});

// Endpoint HTTP para probar que el servidor funciona
app.get("/", (req, res) => {
  res.send("Servidor Node.js escuchando alertas de ESP8266 vía MQTT 🚀");
});

// Iniciar servidor Express
app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en puerto ${PORT}`);
});
