import cors from 'cors';
import express from 'express';
import path from 'path';
import { SerialPort } from 'serialport';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Default USB port (e.g., ESP32)
const usbPortPath = 'COM3'; // Change this if needed
let espPort = null;
let btPort = null; // Bluetooth port (HC-05)

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

// Initialize USB Serial Port (e.g. ESP32)
try {
  espPort = new SerialPort({ path: usbPortPath, baudRate: 9600 });
  espPort.on('open', () => console.log(`USB serial port open on ${usbPortPath}`));
  espPort.on('error', err => console.error('USB serial port error:', err.message));
} catch (err) {
  console.warn('USB serial port not available – running in simulation mode');
}

// Attempt to auto-detect Bluetooth COM port (HC-05)
SerialPort.list().then(ports => {
  const btCandidate = ports.find(port =>
    port.path.includes('COM') &&
    (port.friendlyName?.toLowerCase().includes('bluetooth') ||
     port.manufacturer?.toLowerCase().includes('bluetooth') ||
     port.pnpId?.toLowerCase().includes('hc') ||
     port.friendlyName?.toLowerCase().includes('hc')
    )
  );

  if (btCandidate) {
    btPort = new SerialPort({ path: btCandidate.path, baudRate: 9600 });
    btPort.on('open', () => console.log(`Bluetooth port open on ${btCandidate.path}`));
    btPort.on('error', err => console.error('Bluetooth port error:', err.message));
  } else {
    console.warn('Bluetooth module (HC-05) not found');
  }
});

// API to toggle relays
app.get('/api/relay/:id/:action', (req, res) => {
  const id = parseInt(req.params.id);
  const action = req.params.action;
  let valueToSend;

  // Convert action to numeric code
  if (action === 'on') valueToSend = id;
  else if (action === 'off') valueToSend = 4 + id;
  else if (action === 'allon') valueToSend = 0;
  else if (action === 'alloff') valueToSend = 10;
  else return res.status(400).send({ error: 'Invalid action' });

  // Choose which port to send through
  const chosenPort = (btPort && btPort.isOpen) ? btPort : (espPort && espPort.isOpen) ? espPort : null;

  if (!chosenPort) {
    console.log(`Simulated send: relay ${id} ${action}`);
    return res.send({ status: 'simulated', value: valueToSend });
  }

  chosenPort.write(String(valueToSend), err => {
    if (err) {
      console.error('Error writing to serial:', err);
      return res.status(500).send({ error: 'Serial write failed' });
    } else {
      return res.send({ status: 'sent', value: valueToSend });
    }
  });
});

// (Optional) Add status route to check connectivity
app.get('/api/status', (req, res) => {
  res.send({
    usb: espPort?.isOpen || false,
    bluetooth: btPort?.isOpen || false
  });
});

// Serve frontend
app.get('/:any(*)', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
