const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { isAuthenticated } = require('../middleware/authenticate');

// Definición de las rutas
router.get('/', moviesController.getAll); // Obtiene todas las películas
router.get('/:id', moviesController.getSingle); // Obtiene una película por ID
router.post('/', isAuthenticated, moviesController.createMovie); // Crea una nueva película
router.put('/:id', isAuthenticated, moviesController.updateMovie); // Actualiza una película
router.delete('/:id', isAuthenticated, moviesController.deleteMovie); // Elimina una película

module.exports = router;
