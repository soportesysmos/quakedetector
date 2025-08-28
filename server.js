// server.js
const mqtt = require("mqtt");

// Conexión al broker público
const client = mqtt.connect("mqtt://test.mosquitto.org:1883");

// Topic que usa tu ESP8266
const topic = "esp8266/test";

// Cuando se conecta al broker
client.on("connect", () => {
  console.log("✅ Conectado a test.mosquitto.org");
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`📡 Suscrito al topic: ${topic}`);
    } else {
      console.error("❌ Error al suscribirse:", err);
    }
  });
});

// Cuando llega un mensaje del ESP8266
client.on("message", (topic, message) => {
  console.log(`🔔 Mensaje recibido en ${topic}: ${message.toString()}`);
});

// Manejo de errores
client.on("error", (err) => {
  console.error("⚠️ Error en conexión MQTT:", err);
});
