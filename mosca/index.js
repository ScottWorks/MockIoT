require('dotenv').config();
const mosca = require('mosca');
const { BROKER_PORT, MONGO_URL } = process.env;

const broker = new mosca.Server({
  port: Number.parseInt(BROKER_PORT),
  backend: {
    type: 'mongo',
    url: MONGO_URL,
    pubsubCollection: 'message-broker'
  }
});

broker.on('clientConnected', function(client) {
  console.log(`${client.id} connected`);
});

broker.on('clientDisconnected', function(client) {
  console.log(`${client.id} disconnected`);
});

broker.on('published', function(packet, client) {
  console.log(`${packet.messageId} was published`);
});

broker.on('subscribed', function(topic, client) {
  console.log(`${client.id} subscribed to ${topic}`);
});

broker.on('unsubscribed', function(topic, client) {
  console.log(`${client.id} unsubscribed from ${topic}`);
});

broker.on('ready', function() {
  console.log('Mosca is ready...');
});
