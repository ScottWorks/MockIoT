require('dotenv').config();

const express = require('express'),
  helmet = require('helmet'),
  bodyParser = require('body-parser'),
  sensors = require('./controllers/sensors');

const app = express(),
  { PORT } = process.env;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/sensors', sensors.createSensors);
// app.put('/api/sensors', sensors.editSensors);
app.put('/api/sensors/:id', sensors.toggleSensor);
app.delete('/api/sensors/:id', sensors.killSensor);

app.listen(PORT, function() {
  console.log(`Listening on Port: ${PORT}`);
});
