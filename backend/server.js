import express from "express";
import bluetoothService from "./services/BluetoothService.js";
import webcamService from "./services/WebcamService.js";
import { validateCommand } from "./services/commandValidator.js";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
    res.send("Yeah Hand Backend API running");
});

// Webcam stream route
app.get("/api/webcam/stream", (req, res) => {
    try {
        res.set({
            "Content-Type": "multipart/x-mixed-replace; boundary=ffmpeg",
            "Cache-Control": "no-store, no-cache, must-revalidate, private",
            "Pragma": "no-cache",
        });
        res.flushHeaders();

        webcamService.startStream(res);
    } catch (err) {
        if (res.headersSent) {
            return res.end();
        }

        res.status(err.statusCode || 500).json({
            success: false,
            error: err.message,
        });
    }
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

        const validation = validateCommand(command);

        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                error: validation.error,
            });
        }

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
