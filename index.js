const mqtt = require('mqtt');

// CONFIGURACIÓN MQTT
const MQTT_BROKER = 'mqtts://8154b54566104801bad4e348282b332f.s1.eu.hivemq.cloud:8884';
const MQTT_USER = 'sysmos';
const MQTT_PASSWORD = 'A25495039c';
const MQTT_TOPIC = 'esp/alert';

// Tiempo de ventana para contar alertas simultáneas (ms)
const WINDOW_MS = 5000;

// Almacena alertas recientes
let recentAlerts = [];

// Conectar al broker MQTT
const client = mqtt.connect(MQTT_BROKER, {
  username: MQTT_USER,
  password: MQTT_PASSWORD,
});

client.on('connect', () => {
  console.log('✅ Conectado a HiveMQ Cloud vía MQTT');
  client.subscribe(MQTT_TOPIC, (err) => {
    if (err) console.error('❌ Error al suscribirse:', err);
    else console.log(`📌 Suscrito al tópico: ${MQTT_TOPIC}`);
  });
});

// Manejar mensajes entrantes
client.on('message', (topic, message) => {
  const now = Date.now();
  try {
    const payload = JSON.parse(message.toString());
    console.log(`📥 Alerta recibida de ESP: ${payload.id}, valor: ${payload.valor}`);

    // Guardar alerta con timestamp
    recentAlerts.push({ id: payload.id, time: now });

    // Eliminar alertas antiguas fuera de la ventana
    recentAlerts = recentAlerts.filter(a => now - a.time <= WINDOW_MS);

    // Contar ESP únicos dentro de la ventana
    const uniqueESPs = [...new Set(recentAlerts.map(a => a.id))];

    if (uniqueESPs.length >= 2) {
      console.log(`⚠️ ALERTA COLECTIVA: ${uniqueESPs.length} ESP detectaron el umbral`);
      // Limpiar para evitar logs repetidos
      recentAlerts = [];
    }
  } catch (err) {
    console.error('❌ Error procesando mensaje MQTT:', err);
  }
});

// Manejar errores
client.on('error', (err) => {
  console.error('❌ Error MQTT:', err);
});
