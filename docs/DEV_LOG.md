# Development Log

Purpose:
Record each development session, what was completed, blockers encountered, lessons learned, and the next steps.

Add a new entry for every work session.

---

# July 17, 2026

## Goal

Complete the command protocol update and prepare for the webcam streaming feature.

## Completed

- Updated the command protocol to send gesture and factor commands separately.
- Opened PR #16 for the command protocol update.
- Confirmed the frontend and backend follow the latest protocol.

## Notes

- Vittorio requested implementing the webcam feature before Bluetooth integration.
- Hardware has been received and is ready for assembly after the webcam work.

## Next Session

- Begin webcam streaming implementation.
- Assemble the robotic hand.

---

# August 2, 2026

## Goal

Plan and begin implementation of the webcam streaming feature.

## Completed

- Reviewed Vittorio's architecture requirements and implementation plan.
- Updated project documentation to reflect the current project status.
- Created the development plan for the webcam streaming feature.
- - Implemented the initial backend webcam streaming infrastructure.
- Added `WebcamService` to manage webcam streaming separately from Bluetooth.
- Added the `/api/webcam/stream` backend endpoint.
- Installed and configured FFmpeg for local development.

## Lessons Learned

- The webcam should be managed by the backend rather than accessed directly by the browser.
- The frontend will only display the video stream while the backend manages hardware communication.
- The webcam feature should be implemented independently from Bluetooth integration so both components remain modular.

## Blockers

- Desktop development machine does not currently have a webcam attached, so the streaming endpoint cannot be validated with real hardware yet.
- Requested a USB webcam for development and testing.

## Next Session

## Next Session

- Test backend streaming with a USB webcam.
- Add the webcam feed to the React frontend.
- Update the README with FFmpeg installation and setup instructions.