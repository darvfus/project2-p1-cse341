const express = require('express');
const port = process.env.PORT || 3000;
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const swaggerUi = require('swagger-ui-express'); // Importa Swagger UI
const swaggerDocument = require('./swagger.json'); // Archivo generado por swagger-autogen

const app = express();

app
  .use(bodyParser.json())
  .use(logger('dev'))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // Agrega Swagger UI
  .use('/', require('./routes')); // Rutas de la API

// Inicialización de la base de datos
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
      console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
    });
  }
});