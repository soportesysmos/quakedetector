import express from "express";
import mqtt from "mqtt";

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del broker MQTT (ejemplo: test.mosquitto.org)
const MQTT_BROKER = "mqtt://test.mosquitto.org";
const MQTT_TOPIC = "esp8266/alert";

// Conectar al broker
const client = mqtt.connect(MQTT_BROKER);

// Manejo de conexión MQTT
client.on("connect", () => {
  console.log("✅ Conectado al broker MQTT");
  client.subscribe(MQTT_TOPIC, (err) => {
    if (err) {
      console.error("❌ Error al suscribirse al tópico:", err);
    } else {
      console.log(`📡 Suscrito al tópico: ${MQTT_TOPIC}`);
    }
  });
});

// Recepción de mensajes desde ESP8266
client.on("message", (topic, message) => {
  console.log(`⚠️ Alerta recibida en tópico ${topic}: ${message.toString()}`);
});

// Endpoint simple para verificar que Render responde
app.get("/", (req, res) => {
  res.send("Servidor en Render escuchando MQTT y listo ✅");
});

// Iniciar servidor Express
app.listen(PORT, () => {
  console.log(`🚀 Servidor HTTP corriendo en puerto ${PORT}`);
});
