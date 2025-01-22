const express = require('express');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
  res.send('Hello World');
});

// Importar y usar las rutas de 'cinemas' y 'movies'
router.use('/cinemas', require('./cinemas'));  // Asegúrate de que el archivo cinemas.js exista
router.use('/movies', require('./movies'));   // Asegúrate de que el archivo movies.js exista

module.exports = router;
