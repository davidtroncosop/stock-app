const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Conexión a la base de datos
mongoose.connect(`mongodb+srv://dtroncoso:${process.env.MONGO_DB_PASS}@cluster0.hf9eg68.mongodb.net/stock-app?retryWrites=true&w=majority`)
  .then((result) => console.log('Conexión exitosa a la BBDD'))
  .catch((err) => console.log(err));

const productSchema   = mongoose.Schema({
    name: {type: String, required: true},
    price: Number,},
    {timestamps:true }
    );


app.get('/api/v1/products', (req, res) => {
      // Aquí puedes escribir el código que maneje la solicitud GET
      // por ejemplo, puedes consultar una base de datos y enviar la respuesta en formato JSON
  res.json({ products: [{ name: 'Product 1', price: 10 }, { name: 'Product 2', price: 20 }] });
});
    

const Product = mongoose.model('Product', productSchema);

app.use(express.json());

app.post('/api/v1/products', (req, res) => {
  console.log(req.body); // <- Agregar esta línea
  // Código para crear un nuevo producto en la base de datos
  const newProduct = new Product(req.body)
  newProduct
    .save()
    .then((result) => {
      res.status(201).json({ ok: true })
    })
    .catch((err) => {
      console.log(err)
    })
});


// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});

// Puerto de escucha
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
