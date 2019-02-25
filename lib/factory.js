module.exports = function(schema) {
  var sensor;

  switch (schema.type) {
  case 'temperature':
    sensor = new Temperature();
    break;
  case 'humidity':
    sensor = new Humidity();
    break;
  case 'barometer':
    sensor = new Barometer();
    break;
  }

  sensor.pid = process.pid;
  sensor.payload = {
    id: schema.id,
    name: schema.id,
    longitude: schema.longitude,
    latitude: schema.latitude,
    altitude: schema.altitude,
    group: schema.group,
    type: schema.type,
    model: schema.model,
    status: 'online',
    timestamp: Date.now(),
    currReadout: null
  };

  sensor.getReadout = function() {
    const variance =
      Math.random() * (this.maxVariance - this.minVariance) + this.minVariance;
    sensor.payload.currReadout = 70 + variance;
    sensor.payload.timestamp = Date.now();
  };

  sensor.kill = function() {
    sensor.payload.status = 'offline';
    clearInterval(sensor);
  };

  return sensor;
};

function Temperature() {
  this.minVariance = -0.2;
  this.maxVariance = 0.1;
}

function Humidity() {
  this.minVariance = -1;
  this.maxVariance = 1.5;
}

function Barometer() {
  this.minVariance = -3;
  this.maxVariance = 4;
}
