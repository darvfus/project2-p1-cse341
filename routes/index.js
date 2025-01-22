const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

// Correct use of the cinemas route
router.use('/cinemas', require('./cinemas'));  // Make sure cinemas.js is exporting a router

module.exports = router;
