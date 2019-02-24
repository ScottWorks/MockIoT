const SensorFactory = require('./sensors');

const sensor = new SensorFactory('temperature');

setInterval(function() {
  sensor.getReadout();
  console.log(sensor.payload);
}, 1000);
