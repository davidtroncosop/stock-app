const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

const PORT = process.env.PORT||4000

app.listen(4000, () => {
  console.log('Servidor iniciado en el puerto 4000.');
});

