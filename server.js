// server.js
const mqtt = require("mqtt");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// Conexión al broker público
const brokerUrl = "mqtt://test.mosquitto.org:1883";
const topic = "esp8266/alert";

console.log("Conectando a broker:", brokerUrl);
const client = mqtt.connect(brokerUrl);

// Evento cuando se conecta al broker
client.on("connect", () => {
  console.log("Conectado a MQTT broker");
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Suscrito al tópico: ${topic}`);
    } else {
      console.error("Error al suscribirse:", err);
    }
  });
});

// Evento cuando llega un mensaje
client.on("message", (topic, message) => {
  console.log(`📩 Mensaje recibido en ${topic}: ${message.toString()}`);
});

// Endpoint para comprobar que el servidor corre
app.get("/", (req, res) => {
  res.send("Servidor MQTT escuchando mensajes...");
});

// Mantener Render vivo
app.listen(port, () => {
  console.log(`Servidor web en puerto ${port}`);
});
