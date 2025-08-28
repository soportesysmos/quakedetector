const mqtt = require("mqtt");

const brokerUrl = "mqtt://broker.hivemq.com:1883"; // Puedes usar tu propio broker
const topic = "quakedetector/alert";

const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("✅ Conectado al broker MQTT");
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log("📡 Suscrito a:", topic);
    }
  });
});

client.on("message", (topic, message) => {
  console.log("⚠️ Alerta recibida:", message.toString());
});
