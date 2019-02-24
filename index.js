const { spawn } = require('child_process');

for (let i = 0; i <= 3; i++) {
  const childProcess = spawn('node', ['./sensors.js', 'temperature']);

  childProcess.stdout.on('data', function(data) {
    console.log(data.toString());
  });
}
