const mosca = require('mosca');

const { BROKER_PORT } = process.env;

const broker = new mosca.Server({
  port: 1883
});

broker.on('clientConnected', function(client) {
  console.log('Client Connected: ' + client.id);
});

broker.on('clientDisconnected', function(client) {
  console.log('Client Disconnected:', client.id);
});

broker.on('published', function(packet, client) {
  console.log('Published: ' + packet.payload);
});

broker.on('ready', function() {
  console.log('Mosca is ready...');
});
