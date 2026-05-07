import express from "express";
import bluetoothService from "./services/BluetoothService.js";

const app = express();
const PORT = 3001;

app.use(express.json());

// Health check route
app.get("/", (req, res) => {
    res.send("Yeah Hand Backend API running");
});

// Connect route
app.post("/api/hand/connect", (req, res) => {
    try {
        bluetoothService.connect();

        res.json({
            success: true,
            message: "Bluetooth device connected",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

// Send command route
app.post("/api/hand/command", (req, res) => {
    try {
        const { command } = req.body;

        bluetoothService.sendCommand(command);

        res.json({
            success: true,
            message: "Command sent",
            command,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

// Disconnect route
app.post("/api/hand/disconnect", (req, res) => {
    try {
        bluetoothService.disconnect();

        res.json({
            success: true,
            message: "Bluetooth device disconnected",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});