# Yeah Hand - Project Status

**Last Updated:** July 17, 2026



Purpose:
This document always reflects the CURRENT state of the project. Update it whenever priorities, milestones, or project status change.

Do NOT keep historical information here—that belongs in DEV_LOG.md.


---

# Project Overview

The goal of this project is to create a web application that allows users to remotely control the Yeah Robotic/Prosthetic Hand.

Current architecture:

Browser
↓
React Frontend
↓
Express Backend
↓
Bluetooth Service
↓
Yeah Hand Hardware

Webcam streaming from the backend to the frontend is planned but not yet implemented.

---

# Repository

Repository:
PubInv/Yeah-Hand-Web-App

Current Branch:

oscar/update-command-protocol

Main Maintainer:

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

1. Webcam streaming
2. Assemble hand
3. Bluetooth integration
4. Hardware testing
5. Backend unit tests

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

-

Open

-

---

# Things I Learned

(Add notes after every coding session.)

---

# Questions for Vittorio

(Add anything that needs clarification.)

---

# Session Log

## July 17

Completed

- Updated command protocol
- Opened PR #16

Next Session

- Webcam streaming
- Assemble hand

Notes

- Vittorio wants webcam before Bluetooth.
