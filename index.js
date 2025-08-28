const mqtt = require('mqtt');

// Configuración MQTT (HiveMQ Cloud o broker que uses)
const options = {
  host: '8154b54566104801bad4e348282b332f.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'sysmos',
  password: 'A25495039c'
};

const client = mqtt.connect(options);
const TOPIC = 'esp8266/alert';

// Objeto para almacenar últimos envíos
let alertBuffer = {}; // { ESP_ID: timestamp }

// Ventana de tiempo en milisegundos
const WINDOW_MS = 100;

client.on('connect', () => {
  console.log('✅ Conectado al broker MQTT');
  client.subscribe(TOPIC, (err) => {
    if (err) console.error('❌ Error al suscribirse:', err);
    else console.log(`Suscrito al tópico: ${TOPIC}`);
  });
});

client.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const espId = data.id;
    const now = Date.now();

    // Guardar timestamp del ESP que envió alerta
    alertBuffer[espId] = now;

    // Limpiar ESP que no enviaron en los últimos WINDOW_MS
    const recentESP = Object.keys(alertBuffer).filter(id => now - alertBuffer[id] <= WINDOW_MS);

    if (recentESP.length >= 2) {
      console.log(`⚠️ ALERTA MÚLTIPLE: ${recentESP.length} ESP reportaron alerta en los últimos ${WINDOW_MS / 100}s`);
      console.log('ESP activos:', recentESP);
      // Aquí puedes disparar otras acciones, notificaciones, etc.
    }

  } catch (e) {
    console.error('Error procesando mensaje MQTT:', e);
  }
});
