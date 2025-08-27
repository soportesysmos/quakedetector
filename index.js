const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/data', (req, res) => {
  console.log('Datos recibidos del ESP32:', req.body);
  res.send({ status: 'ok' });
});

app.get('/', (req, res) => res.send('Servidor Node.js activo!'));

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
