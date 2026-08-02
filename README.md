# Yeah Hand Web App

Web app and backend bridge for controlling the Yeah Hand robotic/prosthetic hand.

## System Architecture

This project has two main layers:

### Firmware layer
- Written in C/C++
- Runs on the ESP32 inside the robotic hand
- Controls the motors/fingers
- Receives gesture and factor commands separately, such as `PINCH` followed by `50`

### Web/backend layer
- Written in JavaScript/TypeScript
- Runs on a PC/server, not on the hand
- Provides the browser interface
- Sends commands from the web app to the hand over Bluetooth/serial

The file `backend/services/BluetoothService.js` belongs to the backend layer. It is not firmware code.

---

## Getting Started

### Prerequisites

Before getting started, make sure you have the following installed:

- Node.js v20 recommended
- npm

### Backend Setup

The frontend and backend share the root `package.json`. From the project root, install all dependencies:

```bash
npm install
```

Start the backend server from the project root:

```bash
node backend/server.js
```

### Backend Bluetooth Test

The current Bluetooth service simulates the connection and command flow so the backend structure can be tested without the physical hand.

```bash
node backend/test/bluetoothTest.js
```

#### Expected Output

```text
Connecting to Bluetooth device...
Simulated Bluetooth connection established.
Sending command to hand: PINCH
Sending command to hand: 50
Disconnecting from Bluetooth device...
Bluetooth connection closed.
```


---

## Frontend Setup

From the project root, install the frontend dependencies (if you haven't already):

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

By default, the frontend development server will be available at the URL shown in the terminal (typically `http://localhost:5173`).

The frontend communicates with the backend to send commands to the robotic hand.

## Running the Application

Open two terminal windows.

**Terminal 1 – Backend**

```bash
node backend/server.js
```

**Terminal 2 – Frontend**

```bash
npm run dev
```

Open the frontend in your browser using the URL shown in the terminal (typically `http://localhost:5173`).
