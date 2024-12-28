require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs'); 
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); 

// MongoDB connection
mongoose.connect( process.env.DB_CONNECTION_URL, {})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(bodyParser.json());

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




// Routes
const countriesRoutes = require('./routes/countries'); 
app.use('/countries', countriesRoutes);

const categoriesRoutes = require('./routes/categories'); 
app.use('/categories', categoriesRoutes);

const ingradientsRoutes = require('./routes/ingradients'); 
app.use('/ingradients', ingradientsRoutes);

const dishesRoutes = require('./routes/dishes'); 
app.use('/dishes', dishesRoutes);

app.get('/', async (req, res) => {
  try {
    res.status(200).json({message: "hello world"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.listen(port, () => console.log(`Server listening on port ${port}`));