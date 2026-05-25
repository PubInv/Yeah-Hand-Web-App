import { useState } from "react";

function App() {
    const [status, setStatus] = useState("Not Connected");
    const [command, setCommand] = useState("PINCH 50");

    async function connectHand() {
        try {
            const response = await fetch("http://localhost:3001/api/hand/connect", {
                method: "POST",
            });

            const data = await response.json();

            setStatus(data.message);
        } catch {
            setStatus("Connection failed");
        }
    }

    async function sendCommand() {
        try {
            const response = await fetch("http://localhost:3001/api/hand/command", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    command,
                }),
            });

            const data = await response.json();

            setStatus(data.message || data.error);
        } catch {
            setStatus("Command failed");
        }
    }

    async function disconnectHand() {
        try {
            const response = await fetch("http://localhost:3001/api/hand/disconnect", {
                method: "POST",
            });

            const data = await response.json();

            setStatus(data.message);
        } catch {
            setStatus("Disconnect failed");
        }
    }

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Yeah Hand Control Interface</h1>

            <p>Status: {status}</p>

            <div style={{ display: "flex", gap: "1rem" }}>
                <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Enter command"
                    style={{
                        padding: "0.5rem",
                        marginBottom: "1rem",
                        width: "300px",
                    }}
                />
                <button onClick={connectHand}>
                    Connect
                </button>

                <button onClick={sendCommand}>
                    Send Command
                </button>

                <button onClick={disconnectHand}>
                    Disconnect
                </button>
            </div>
        </div>
    );
}

export default App;