class BluetoothService {
    constructor() {
        this.isConnected = false;
    }

    connect() {
        console.log("Connecting to Bluetooth device...");
        this.isConnected = true;
        console.log("Simulated Bluetooth connection established.");
    }

    sendCommand(command) {
        if (!this.isConnected) {
            throw new Error("Cannot send command: Bluetooth device is not connected.");
        }

        console.log(`Sending command to hand: ${command}`);
    }

    disconnect() {
        console.log("Disconnecting from Bluetooth device...");
        this.isConnected = false;
        console.log("Bluetooth connection closed.");
    }
}

export default new BluetoothService();