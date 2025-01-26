const express = require('express');
const router = express.Router();

const cinemasController = require("../controllers/cinemas");
const { isAuthenticated } = require('../middleware/authenticate');

// Rutas para manejar las operaciones de los usuarios
router.get('/', cinemasController.getAll); // Obtener todos los usuarios
router.get('/:id', cinemasController.getSingle); // Obtener un usuario por ID

router.post('/', isAuthenticated ,cinemasController.createCinema); // Crear un nuevo usuario
router.put('/:id', isAuthenticated ,cinemasController.updateCinema); // Actualizar un usuario existente
router.delete('/:id', isAuthenticated ,cinemasController.deleteCinema); // Eliminar un usuario por ID

module.exports = router;
