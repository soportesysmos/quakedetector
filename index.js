const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // importante para recibir JSON

// Endpoint que recibe alertas del ESP8266
app.post('/alert', (req, res) => {
  console.log('⚠️ Alerta recibida del ESP8266: ', req.body);
  res.send({ status: 'alert received' });
  console.log('📌 Request headers:', req.headers); // ayuda a depurar
});

// Endpoint de prueba
app.get('/', (req, res) => res.send('Servidor activo!'));

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
