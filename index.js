const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // importante para recibir JSON

app.post('/alert', (req, res) => {
  res.send({ status: 'alert received' }); // enviar respuesta **rápido**
  console.log('⚠️ Alerta recibida:', req.body); // luego loguear
});

app.get('/', (req, res) => res.send('Servidor activo!'));

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
