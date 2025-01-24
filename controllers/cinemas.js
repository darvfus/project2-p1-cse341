const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const Cinema = require('../models/cinema');

// Get all cinemas
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('cinemas').find();
    const cinemas = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(cinemas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cinemas', error });
  }
};

// Get a single cinema by ID
const getSingle = async (req, res) => {
  try {
    const cinemaId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('cinemas').find({ _id: cinemaId });
    const cinema = await result.toArray();
    if (cinema.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(cinema[0]);
    } else {
      res.status(404).json({ message: 'Cinema not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cinema', error });
  }
};

// Create a new cinema
const createCinema = async (req, res) => {
  try {
    const { name, location, capacity, openingHours, amenities, contactNumber, isOpen } = req.body;

    // Validate required fields and types
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'The field "name" is required and must be a string.' });
    }
    if (!location || typeof location !== 'string') {
      return res.status(400).json({ message: 'The field "location" is required and must be a string.' });
    }
    if (!capacity || typeof capacity !== 'number' || capacity <= 0) {
      return res.status(400).json({ message: 'The field "capacity" must be a positive number.' });
    }
    if (!openingHours || typeof openingHours !== 'string') {
      return res.status(400).json({ message: 'The field "openingHours" is required and must be a string.' });
    }
    if (!contactNumber || typeof contactNumber !== 'string') {
      return res.status(400).json({ message: 'The field "contactNumber" is required and must be a string.' });
    }
    if (typeof isOpen !== 'boolean') {
      return res.status(400).json({ message: 'The field "isOpen" must be a boolean.' });
    }

    const cinema = new Cinema({
      name,
      location,
      capacity,
      openingHours,
      amenities,
      contactNumber,
      isOpen
    });

    const response = await mongodb.getDb().db().collection('cinemas').insertOne(cinema);
    if (response.acknowledged) {
      res.status(201).json({
        response: response,
        message: "Created new cinema successfully.",
        cinema: cinema
      });
    } else {
      res.status(500).json({ message: 'Error creating cinema', error: response.error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating cinema', error });
  }
};

// Update an existing cinema
const updateCinema = async (req, res) => {
  try {
    const cinemaId = new ObjectId(req.params.id);
    const { name, location, capacity, openingHours, amenities, contactNumber, isOpen } = req.body;

    // Validate required fields and types
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'The field "name" is required and must be a string.' });
    }
    if (!location || typeof location !== 'string') {
      return res.status(400).json({ message: 'The field "location" is required and must be a string.' });
    }
    if (!capacity || typeof capacity !== 'number' || capacity <= 0) {
      return res.status(400).json({ message: 'The field "capacity" must be a positive number.' });
    }
    if (!openingHours || typeof openingHours !== 'string') {
      return res.status(400).json({ message: 'The field "openingHours" is required and must be a string.' });
    }
    if (!contactNumber || typeof contactNumber !== 'string') {
      return res.status(400).json({ message: 'The field "contactNumber" is required and must be a string.' });
    }
    if (typeof isOpen !== 'boolean') {
      return res.status(400).json({ message: 'The field "isOpen" must be a boolean.' });
    }

    const updatedCinema = {
      name,
      location,
      capacity,
      openingHours,
      amenities,
      contactNumber,
      isOpen
    };

    const cinemaExists = await mongodb
      .getDb()
      .db()
      .collection('cinemas')
      .findOne({ _id: cinemaId });

    if (!cinemaExists) {
      return res.status(404).json({ message: 'Cinema not found' });
    }

    const response = await mongodb
      .getDb()
      .db()
      .collection('cinemas')
      .replaceOne({ _id: cinemaId }, updatedCinema);

    if (response.modifiedCount > 0) {
      const updatedCinemaData = await mongodb
        .getDb()
        .db()
        .collection('cinemas')
        .findOne({ _id: cinemaId });

      res.status(200).json({
        message: 'Updated cinema successfully.',
        cinema: updatedCinemaData
      });
    } else {
      res.status(500).json({ message: 'Error updating the cinema', error: response.error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cinema', error });
  }
};

// Delete a cinema
const deleteCinema = async (req, res) => {
  try {
    const cinemaId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('cinemas').deleteOne({ _id: cinemaId });

    if (response.deletedCount > 0) {
      res.status(200).json({
        message: "Deleted cinema successfully.",
        response: response
      });
    } else {
      res.status(500).json({ message: 'Error deleting the cinema', error: response.error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cinema', error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCinema,
  updateCinema,
  deleteCinema,
};
