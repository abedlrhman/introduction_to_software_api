require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs'); 


const app = express();
const port = 3000;

// Middleware
app.use(express.json()); 

// MongoDB connection
mongoose.connect(process.env.DB_CONNECTION_URL, {})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'A simple Express.js API',
    },
  },
  swaggerDefinition: yamljs.load('./swagger/global.yml'),
  apis: ['./routes/*.js', './swagger/*.yml'], // Include all YAML files
};

const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define routes (example: in routes/users.js)
const userRoutes = require('./routes/users'); 
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});