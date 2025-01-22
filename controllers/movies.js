const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const Movie = require('../models/movies'); // Asegúrate de tener el modelo Movie

// Obtener todas las películas
const getAllMovies = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('movies').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error });
  }
};

// Obtener una película por su ID
const getSingleMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('movies').find({ _id: movieId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie', error });
  }
};

// Crear una nueva película
const createMovie = async (req, res) => {
  try {
    const { title, genre, duration, releaseDate, director, cast, cinemaId } = req.body;
    console.log('Creating movie with data:', req.body); // Log para verificar los datos

    const validCinemaId = ObjectId.isValid(cinemaId) ? new ObjectId(cinemaId) : null;
    if (!validCinemaId) {
      return res.status(400).json({ message: 'Invalid cinemaId provided' });
    }

    const movie = new Movie({
      title,
      genre,
      duration,
      releaseDate,
      director,
      cast,
      cinemaId: validCinemaId
    });

    const savedMovie = await movie.save();
    console.log('Movie created:', savedMovie); // Log para verificar la respuesta

    res.status(201).json({
      message: "Película creada con éxito",
      movie: savedMovie
    });
  } catch (error) {
    console.log('Error creating movie:', error); // Log para errores
    res.status(500).json({
      message: 'Error al crear la película',
      error: error.message
    });
  }
};

// Actualizar una película por su ID
const updateMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const { title, genre, duration, releaseDate, director, cast, cinemaId } = req.body;

    const validCinemaId = ObjectId.isValid(cinemaId) ? new ObjectId(cinemaId) : null;
    if (!validCinemaId) {
      return res.status(400).json({ message: 'Invalid cinemaId provided' });
    }

    const movie = {
      title,
      genre,
      duration,
      releaseDate,
      director,
      cast,
      cinemaId: validCinemaId, // Usa el cinemaId validado
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .replaceOne({ _id: movieId }, movie);

    console.log('Update response:', response); // Log para verificar la respuesta de la actualización

    if (response.modifiedCount > 0) {
      res.status(200).json({
        message: "Película actualizada con éxito.",
        movie: movie,
      });
    } else {
      res.status(404).json({ message: 'Película no encontrada o no se hicieron cambios' });
    }
  } catch (error) {
    console.log('Error updating movie:', error); // Log para errores
    res.status(500).json({ message: 'Error al actualizar la película', error: error.message });
  }
};

// Eliminar una película por su ID
const deleteMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('movies').deleteOne({ _id: movieId });

    if (response.deletedCount > 0) {
      res.status(200).json({
        message: "Película eliminada con éxito.",
      });
    } else {
      res.status(404).json({ message: 'Película no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error });
  }
};

module.exports = {
  getAllMovies,
  getSingleMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
