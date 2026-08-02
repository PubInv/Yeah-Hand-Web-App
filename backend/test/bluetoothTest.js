import bluetoothService from "../services/BluetoothService.js";
try {
    bluetoothService.connect();

    bluetoothService.sendCommand("PINCH");
    bluetoothService.sendCommand("50");

    bluetoothService.disconnect();
} catch (error) {
    console.error(error.message);
}
