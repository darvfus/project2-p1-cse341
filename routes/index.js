const express = require('express');
const router = express.Router();
const passport = require('passport'); // Importa passport

// Ruta principal
//router.get('/', (req, res) => {
  //res.send('Hello World');
//});

// Importar y usar las rutas de 'cinemas' y 'movies'
router.use('/cinemas', require('./cinemas'));  // Asegúrate de que el archivo cinemas.js exista
router.use('/movies', require('./movies'));   // Asegúrate de que el archivo movies.js exista
router.use('/swagger', require('./swagger')); // Asegúrate de que el archivo swagger.js exista

// Rutas de autenticación
router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
