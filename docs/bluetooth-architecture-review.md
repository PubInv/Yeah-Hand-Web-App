# Bluetooth Architecture Review (SPP vs BLE)

## Overview

The current firmware for the Yeah Hand uses **Bluetooth Classic Serial (SPP)** for communication.  
The goal of this review is to evaluate whether we should continue using SPP or migrate to **Bluetooth Low Energy (BLE)**, particularly considering the requirement for a **web-based control interface**.

The web application is intended to:
- Send control commands to the robotic hand
- Display real-time video of the hand moving
- Allow interaction from a browser-based UI

---

## Current Firmware

The firmware currently communicates using:

Bluetooth Classic → **Serial Port Profile (SPP)**

This allows the microcontroller to expose a serial interface over Bluetooth, which works similar to a wired UART serial connection.

Advantages:
- Simple command structure
- Stable for continuous communication
- Already implemented and tested in firmware

---

## Option 1: Bluetooth Classic (SPP)

### Advantages

- Already implemented in the firmware
- Simple serial-style communication
- Good throughput and stable connections
- Minimal firmware changes required

### Limitations

Modern browsers **cannot access Bluetooth Classic (SPP)** for security reasons.

This means a browser cannot directly connect to the device.

To use SPP with a web interface, we would need a **desktop bridge application** that:
```
Web App (Browser)
    ↓
Desktop Bridge Application
    ↓
Bluetooth SPP
    ↓
Yeah Hand
```
The bridge would handle:
- Bluetooth connection
- Serial communication
- Forwarding commands from the web interface

---

## Option 2: Bluetooth Low Energy (BLE)

BLE is supported in modern browsers through the **Web Bluetooth API** (currently in Chromium-based browsers).

This allows direct connections to the device from a web page.

Architecture would look like:
```
Web App (Browser)
      ↓
Web Bluetooth API
      ↓
BLE Firmware
      ↓
Yeah Hand
```

### Advantages

- Direct browser communication
- No desktop bridge required
- Simpler deployment for users

### Limitations

- Requires firmware changes
- BLE uses a different communication model (services and characteristics)
- Lower throughput than Bluetooth Classic

For the command sizes expected (small servo commands), throughput should still be sufficient.

---

## Latency and Performance

For this project, communication will consist primarily of **small control commands**, such as:

Example command messages might look like:
```
GRIP: 40
THUMB: 80
GESTURE: WAVE
```


For this type of communication:

- BLE latency is generally acceptable
- Performance differences between BLE and SPP are unlikely to affect control responsiveness

Both approaches should support real-time interaction for the robotic hand.

---

## Recommendation (V1)

For the first version of the system:

**Recommendation:** Keep **Bluetooth Classic (SPP)** for firmware stability and implement a **desktop bridge layer** for the web interface.

Reasons:
- Firmware already works
- Faster path to a working system
- Avoids immediate firmware refactoring

Architecture:
```
Web App (Browser)
    ↓
Desktop Bridge Application
    ↓
Bluetooth SPP
    ↓
Yeah Hand
```

If direct browser connectivity becomes a priority later, the firmware can be updated to support **BLE** in a future version.

---

## Summary

| Option | Browser Support | Firmware Changes | Complexity |
|------|------|------|------|
| Bluetooth Classic (SPP) | No | None | Requires desktop bridge |
| BLE | Yes | Required | Direct browser connection |

For V1, maintaining **SPP with a bridge layer** is likely the fastest and safest path.