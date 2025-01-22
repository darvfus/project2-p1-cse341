const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');

// Definición de las rutas
router.get('/', moviesController.getAll); // Obtiene todas las películas
router.get('/:id', moviesController.getSingle); // Obtiene una película por ID
router.post('/', moviesController.createMovie); // Crea una nueva película
router.put('/:id', moviesController.updateMovie); // Actualiza una película
router.delete('/:id', moviesController.deleteMovie); // Elimina una película

module.exports = router;
