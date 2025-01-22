const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Users API",
    description: "API for managing user contacts"
  },
  host: 'localhost:3000', // URL pública de tu servidor en producción
  schemes: ["http"], // Usar HTTPS en producción
};

const outputFile = "./swagger.json"; // El archivo Swagger generado
const endpointFiles = ["./routes/index.js"]; // Las rutas de tu API

swaggerAutogen(outputFile, endpointFiles, doc); // Genera el swagger.json automáticamente
