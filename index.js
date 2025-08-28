const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // importante para recibir JSON

app.post('/alert', (req, res) => {
  console.log('⚠️ Alerta recibida del ESP8266:', req.body);
  res.send({ status: 'alert received' });
});

app.get('/', (req, res) => res.send('Servidor activo!'));

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
