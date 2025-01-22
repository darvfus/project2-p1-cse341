const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const Movie = require('../models/movie'); // Asegúrate de tener el modelo Movie

// Get all movies
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('movies').find();
    const movies = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error });
  }
};

// Obtener una película por su ID
const getSingle = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('movies').find({ _id: movieId });
    const movie = await result.toArray();
    if (movie.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(movie[0]);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie', error });
  }
};

// Crear una nueva película
const createMovie = async (req, res) => {
  try {
    const movie = new Movie({
      title: req.body.title,
      genre: req.body.genre,
      duration: req.body.duration,
      releaseDates: req.body.releaseDate,
      director: req.body.director,
      cast: req.body.cast,
      movieId: req.body.movieId
    });

    const response = await mongodb.getDb().db().collection('movies').insertOne(movie);
    if (response.acknowledged) {
      res.status(201).json({
        response: response,
        message: "Created new movie successfully.",
        movie: movie
      });
    } else {
      res.status(500).json({ message: 'Error creating movie', error: response.error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating movie', error });
  }
};

// Actualizar una película por su ID
const updateMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const updatedMovie = {
      title: req.body.title,
      genre: req.body.genre,
      duration: req.body.duration,
      releaseDates: req.body.releaseDate,
      director: req.body.director,
      cast: req.body.cast,
      movieId: req.body.movieId
    };

    const movieExists = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .findOne({ _id: movieId });

    if (!movieExists) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const response = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .replaceOne({ _id: movieId }, updatedMovie);

    if (response.modifiedCount > 0) {
      const updatedMovieData = await mongodb
        .getDb()
        .db()
        .collection('movies')
        .findOne({ _id: movieId });

      res.status(200).json({
        message: 'Updated movie successfully.',
        movie: updatedMovieData
      });
    } else {
      res.status(500).json({ message: 'Error updating the movie', error: response.error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating movie', error });
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
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie,
};
