// index.js
const mqtt = require("mqtt");

// Conectar al broker MQTT público (o al que uses en producción)
const client = mqtt.connect("mqtt://test.mosquitto.org:1883");

client.on("connect", () => {
  console.log("Conectado al broker MQTT");
  client.subscribe("alerta/test", (err) => {
    if (!err) {
      console.log("Suscrito al tópico: alerta/test");
    } else {
      console.error("Error al suscribirse:", err);
    }
  });
});

// Captura de mensajes recibidos
client.on("message", (topic, message) => {
  console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
});

// Captura de errores
client.on("error", (err) => {
  console.error("Error de conexión MQTT:", err);
});
