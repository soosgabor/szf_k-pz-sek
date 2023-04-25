require('dotenv').config();
const express = require('express');

swaggerFile = require("./swagger_output.json")
swaggerUi = require("swagger-ui-express")

const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
const mongoString = process.env.DATABASE_URL;
const trainings = require('./routes/trainings.js');
const courses = require('./routes/courses')
const errorHandler = require('./middleware/error');

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => { console.log(error); })
database.once('connected', () => { console.log('Database connected'); })

const app = express();
app.use(express.json());
app.use('/api/trainings', trainings)
app.use('/api/courses', courses)
app.use(errorHandler);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile)
);

app.listen(3000, () => { console.log(`Server started at ${3000}`); })