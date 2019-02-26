const mqtt = require('mqtt'),
  sensorFactory = require('../lib/factory'),
  mqttClient = mqtt.connect('mqtt://localhost:1883');

const sensorInstances = [];

module.exports = {
  createSensors: function(req, res) {
    const { sensors } = req.body;

    if (!sensors) res.sendStatus(400);

    sensors.forEach(function(sensor) {
      const instance = new sensorFactory(sensor);

      const interval = setInterval(function() {
        if (instance.payload.status === 'online') {
          instance.getReadout();
        }

        mqttClient.publish(sensor.group, JSON.stringify(instance.payload));
      }, 1000);

      sensorInstances.push([instance, interval]);
    });

    res.sendStatus(200);
  },
  toggleSensor: function(req, res) {
    const { id } = req.params;

    sensorInstances.forEach(function(instance) {
      if (id === instance[0].payload.id) {
        instance[0].toggle(instance[1]);
      }
    });

    res.sendStatus(200);
  },
  killSensor: function(req, res) {
    const { id } = req.params;

    sensorInstances.forEach(function(instance, index) {
      if (id === instance[0].payload.id) {
        instance[0].kill(instance[1]);
        sensorInstances.splice(index, 1);
      }
    });

    res.sendStatus(200);
  }
};
