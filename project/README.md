# 🔌 Smart Home Automation System

A Bluetooth-based home automation system that lets you control up to 4 electrical devices using a React + Vite web interface and an Arduino UNO. The system communicates over serial/Bluetooth and uses relays to turn appliances ON/OFF.

---

## 🚀 Features

- Control 4 relays (fans/lights/devices) via Bluetooth or serial
- Web-based frontend (React + Vite)
- Simple numeric command protocol (1–10)
- All ON / All OFF functionality
- Dual input: USB Serial + Bluetooth (HC-05)

---

## 🛠️ Tech Stack

| Layer         | Technology            |
|---------------|------------------------|
| Hardware      | Arduino UNO, 4-Channel Relay Module |
| Communication | Bluetooth (HC-05) or USB Serial     |
| Frontend      | React + Vite           |
| Backend       | Arduino C++            |

---

## 📦 Arduino Code Summary

### 🔌 Pin Mapping

| Relay  | Arduino Pin |
|--------|-------------|
| Relay 1 | 10 |
| Relay 2 | 11 |
| Relay 3 | 12 |
| Relay 4 | 13 |
| BT RX   | D2 (to HC-05 TX) |
| BT TX   | D3 (to HC-05 RX) |

### 🧠 Command Protocol

| Value | Action             |
|-------|--------------------|
| 1-4   | Turn ON relays 1-4 |
| 5-8   | Turn OFF relays 1-4|
| 0     | Turn ON all relays |
| 10    | Turn OFF all relays|

### 📝 Behavior

- Starts with all relays OFF (`HIGH`)
- Listens for `Serial` or `BTSerial` input
- Calls `processCommand(val)` to control relays

---

## 💻 Frontend Setup (React + Vite)

### 📁 Folder Structure

frontend/
├── src/
│ ├── components/
│ └── App.jsx
├── public/
├── vite.config.js
└── index.html


### 🔧 Instructions

1. Navigate to `frontend` folder
2. Install dependencies:
   ```bash
   npm install
npm run dev

### 🔌 Circuit Diagram
1. Connect relay IN1–IN4 to pins 10–13

2. Use voltage divider for HC-05 RX

3. Common GND for Arduino, relays, and HC-05

![Circuit Diagram](./pictures/Screenshot%202025-05-19%20200243.png)
