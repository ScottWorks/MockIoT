const processArg = process.argv,
  type = processArg[processArg.length - 1];

var counter = {
  temperature: 0,
  humidity: 0,
  barometric: 0
};

(function SensorFactory(type) {
  var sensor;

  switch (type) {
  case 'temperature':
    sensor = new Temperature();
    counter.temperature++;
    break;
  case 'humidity':
    sensor = new Humidity();
    counter.humidity++;
    break;
  case 'barometric':
    sensor = new Barometric();
    counter.barometric++;
    break;
  }

  sensor.payload = {
    type: type,
    name: `${type}-${process.pid}`,
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

  setInterval(function() {
    sensor.getReadout();
    console.log(sensor.payload);
  }, 1000);
})(type);

function Temperature() {
  this.name = 'temperature';
  this.minVariance = -0.4;
  this.maxVariance = 0.5;
}

function Humidity() {
  this.name = 'humidity';
  this.minVariance = -1;
  this.maxVariance = 1.5;
}

function Barometric() {
  this.name = 'barometric';
  this.minVariance = -3;
  this.maxVariance = 4;
}
