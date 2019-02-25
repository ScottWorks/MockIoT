const mqtt = require('mqtt'),
  sensorFactory = require('../lib/factory'),
  mqttClient = mqtt.connect('mqtt://test.mosquitto.org');

module.exports = {
  createSensors: function(req, res) {
    const { sensors } = req.body;

    sensors.forEach(function(sensor) {
      const sensorInstance = new sensorFactory(sensor);

      setInterval(function() {
        if (sensorInstance.payload.status === 'online') {
          sensorInstance.getReadout();
        }

        mqttClient.publish(
          sensor.group,
          JSON.stringify(sensorInstance.payload)
        );
      }, 1000);
    });

    res.sendStatus(200);
  },
  editSensors: function(req, res) {
    //
  },
  killSensors: function(req, res) {
    //
  }
};
