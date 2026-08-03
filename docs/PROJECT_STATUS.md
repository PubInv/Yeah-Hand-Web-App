# Yeah Hand - Project Status

**Last Updated:** August 2, 2026


Purpose:
This document always reflects the CURRENT state of the project. Update it whenever priorities, milestones, or project status change.

Do NOT keep historical information here—that belongs in DEV_LOG.md.


---

# Project Overview

The goal of this project is to create a web application that allows users to remotely control the Yeah Robotic/Prosthetic Hand.

Current architecture:

```text
Browser
↓
React Frontend
↓
Express Backend
├── Bluetooth Service
│   ↓
│   Yeah Hand Hardware
│
└── Webcam Streaming (in progress)
    ↓
    USB Webcam
```

Webcam streaming is the current development priority and is now in progress.


# Repository

Repository:
PubInv/Yeah-Hand-Web-App

Current Branch:

oscar/webcam-streaming

Main Maintainers:

Vittorio Lumare

---

# Completed

## Backend

- [x] Express backend
- [x] BluetoothService simulation
- [x] Connect endpoint
- [x] Command endpoint
- [x] Disconnect endpoint

## Frontend

- [x] Connect button
- [x] Disconnect button
- [x] Command buttons
- [x] Status display

## Documentation

- [x] Backend setup guide
- [x] Frontend setup guide
- [x] Bluetooth test guide
- [x] Command protocol documentation

## Protocol

- [x] Updated command protocol
- [x] Gesture commands separated from factor values

---

# Current Protocol

Gesture:

PINCH

POWER

POWERSMALL

MONKEY

RELAX

Factor:

Any integer from 0 through 100.

Gesture and factor are sent separately.

---

# Hardware Status

- [x] Hand received
- [x] Parts received
- [ ] Assemble hand
- [ ] Connect Bluetooth
- [ ] Test first movement

---

# Current Priority

1. Implement backend webcam streaming
2. Display webcam feed in the frontend
3. Assemble hand
4. Bluetooth integration
5. Hardware testing
6. Backend unit tests

---

# Important Files

Frontend

src/App.tsx

Backend

backend/server.js

backend/services/BluetoothService.js

backend/services/commandValidator.js

Documentation

README.md

docs/bluetooth-command-protocol.md

---

# Pull Requests

Merged

- README improvements
- Backend/frontend setup documentation

Open

- Webcam streaming (in progress)

---

# Things I Learned

(Add notes after every coding session.)

---

# Session Log

## August 2

Completed

- Finished command protocol updates.
- Updated project documentation.
- Preparing webcam streaming implementation.

Next Session

- Implement backend webcam service.
- Add webcam view to the frontend.

Notes

- Webcam should be handled by the backend.
- Browser only displays the video stream.
