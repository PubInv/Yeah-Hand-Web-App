# Bluetooth Command Protocol

This document describes the Bluetooth command protocol used by the Rebelia Hand firmware and defines how the backend should interface with it.

The backend server communicates with the robotic hand using Bluetooth Serial (SPP).

The firmware parses incoming commands in `processStringCmd()` (e.g. in `RebeliaRobot.ino`). Commands are sent as plain text strings over Bluetooth, typically newline-terminated (e.g. `\r\n`).

---

## System Context
This protocol applies specifically to communication between the backend and the robotic hand.
The Bluetooth command protocol is used within the following system architecture:

- A web client (browser) sends control commands to the backend over HTTP (TCP/IP)
- The backend runs on a PC with a dedicated Bluetooth connection to the robotic hand
- The backend translates API requests into raw Bluetooth commands
- The robotic hand executes commands via Bluetooth Serial (SPP)
- A webcam connected to the backend streams real-time video back to the client

Flow:

Client → Backend API → Bluetooth SPP → Hand  
Client ← Backend Video Stream ← Webcam

## Command Types

### Grasp Commands

These commands set the current grasp mode:

- `POWER`
- `POWERSMALL`
- `MONKEY`
- `PINCH`
- `RELAX`

> Note: Some firmware versions may include additional grasp types such as `POWERTOOL`.

---

### Closure Percentage

A numeric string represents the closure factor of the hand.

Example:
```text
50
```

- Range: `0–100`
- `0` = fully open
- `100` = fully closed

---

### Finger Control

Commands for controlling individual fingers:

- `FI` — index finger
- `FM` — middle finger
- `FR` — ring finger
- `FT` — thumb flex
- `RT` — thumb rotation

Examples:
```text
FI 50
RT 70
```

---

### Other Commands (Maintenance / Debug)

- `INSTALL`
- `TEST`
- `CONTROL`
- `POS`
- `MOVE`
- `CALIBRATE`
- `SETCENTER`
- `LIM`

---

## Important Behavior

The firmware uses a stateful two-step control model:

1. Send a grasp command (e.g. `PINCH`)
2. Send a closure percentage (e.g. `60`)

Example:
```text
PINCH\r\n
60\r\n
```

The firmware combines these internally to execute the motion.

---

## Message Format

- Commands are ASCII text over Bluetooth Serial (SPP)
- Commands are typically newline-terminated (`\r\n`)
- Numeric values are parsed using `toInt()`
- Some commands include parameters separated by spaces

The backend must preserve the formatting expected by the firmware.

---

## Recommended Backend API Shape

Frontend sends:
```json
{
  "grasp": "pinch",
  "closurePercent": 60
}
```

Backend sends:
```text
PINCH\r\n
60\r\n
```

---

## Recommended Initial Command Set (Backend)

Expose only safe, user-facing controls initially:

- Grasp selection
- Closure percentage
- (Optional) finger-specific control

Restrict or hide these commands from the public UI:

- `INSTALL`
- `TEST`
- `CALIBRATE`
- `SETCENTER`
- `MOVE`
- `LIM`

---

## Open Questions

The following should be validated during implementation:

- Whether all commands require `\r\n` termination
- Exact formatting rules for parameterized commands (e.g. `FI 50`)
- Which commands should be exposed in production UI
- Differences between firmware versions  