const express = require('express');
const path = require('path');
const { SerialPort } = require('serialport');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the React app build (dist/)
app.use(express.static(path.join(__dirname, 'project/dist'))); 
// If using CRA build, it might be 'build' instead of 'dist'.


// Attempt to open serial port to ESP32
let espPort;
try {
  espPort = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 });
  espPort.on('open', () => console.log('Serial port open'));
  espPort.on('error', err => console.error('Serial port error:', err.message));
} catch (err) {
  console.warn('ESP32 serial port not available – running in simulation mode');
  espPort = null;
}
// Example route: toggle relay by id and action
// e.g. GET /api/relay/1/on  or  /api/relay/3/off
app.get('/api/relay/:id/:action', (req, res) => {
  const id = parseInt(req.params.id);
  const action = req.params.action; // 'on' or 'off'
  let valueToSend;

  // Map to values based on ESP32 code logic
  if (action === 'on') {
    // Turn one relay on (1-4)
    valueToSend = id;              // 1→1, 2→2, etc.
  } else if (action === 'off') {
    // Turn one relay off (5-8 => add 4)
    valueToSend = 4 + id;          // 1→5, 2→6, etc.
  } else if (action === 'allon') {
    valueToSend = 0;              // all relays ON
  } else if (action === 'alloff') {
    valueToSend = 10;             // all relays OFF
  } else {
    return res.status(400).send({ error: 'Invalid action' });
  }

  if (espPort && espPort.isOpen) {
    // Send the byte/number to the ESP32
    espPort.write(String(valueToSend), err => {
      if (err) {
        console.error('Error writing to serial:', err);
        res.status(500).send({ error: 'Serial write failed' });
      } else {
        res.send({ status: 'sent', value: valueToSend });
      }
    });
  } else {
    // Simulate (no ESP32 connected)
    console.log(`Simulated send to ESP32: relay ${id} ${action}`);
    res.send({ status: 'simulated', value: valueToSend });
  }
});

// Always return index.html for other routes (for React Router, if any)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'project/dist/index.html'));
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
