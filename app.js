const express = require('express');
require('dotenv').config()
const app = express();

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

const PORT = process.env.PORT||4000

app.listen(PORT, () => { console.log('Servidor iniciado en el puerto ' + PORT); });
