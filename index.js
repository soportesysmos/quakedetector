import mqtt from "mqtt";

const broker = "mqtt://test.mosquitto.org:1883"; // puerto sin TLS
const topic = "esp8266/alerta";

// Conexión
const client = mqtt.connect(broker, {
  reconnectPeriod: 1000, // intenta reconectar
  connectTimeout: 30 * 1000, // 30s timeout
  clean: true
});

client.on("connect", () => {
  console.log("Conectado al broker MQTT");
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Suscrito al tópico: ${topic}`);
    }
  });
});

client.on("message", (t, message) => {
  console.log(`Mensaje recibido en ${t}: ${message.toString()}`);
});

client.on("error", (err) => {
  console.error("Error MQTT:", err);
});
