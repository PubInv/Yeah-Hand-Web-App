# Yeah Hand Web App

Web app and backend bridge for controlling the Yeah Hand robotic/prosthetic hand.

## System Architecture

This project has two main layers:

### Firmware layer
- Written in C/C++
- Runs on the ESP32 inside the robotic hand
- Controls the motors/fingers
- Receives command strings such as `PINCH 50`

### Web/backend layer
- Written in JavaScript/TypeScript
- Runs on a PC/server, not on the hand
- Provides the browser interface
- Sends commands from the web app to the hand over Bluetooth/serial

The file `backend/services/BluetoothService.js` belongs to the backend layer. It is not firmware code.

---

## Backend Bluetooth Service (WIP)

The current Bluetooth service simulates the connection and command flow so the backend structure can be tested without the physical hand.

### Requirements

- Node.js v20 recommended
- npm

### Setup

```bash
npm install
```
### Run the simulated Bluetooth test

```bash
node backend/test/bluetoothTest.js
```
### Expected Output
```
Connecting to Bluetooth device...
Simulated Bluetooth connection established.
Sending command to hand: PINCH 50
Disconnecting from Bluetooth device...
Bluetooth connection closed.