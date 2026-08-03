import { spawn } from "node:child_process";

class WebcamService {
    constructor() {
        this.ffmpegProcess = null;
    }

    startStream(response) {
        if (this.ffmpegProcess) {
            const error = new Error("The webcam stream already has an active viewer.");
            error.statusCode = 409;
            throw error;
        }

        const ffmpegPath = process.env.FFMPEG_PATH || "ffmpeg";
        const ffmpegArguments = this.buildFfmpegArguments();
        const ffmpegProcess = spawn(ffmpegPath, ffmpegArguments, {
            stdio: ["ignore", "pipe", "pipe"],
            windowsHide: true,
        });

        this.ffmpegProcess = ffmpegProcess;
        ffmpegProcess.stdout.pipe(response);

        ffmpegProcess.stderr.on("data", (data) => {
            console.error(`Webcam FFmpeg error: ${data.toString().trim()}`);
        });

        ffmpegProcess.on("error", (error) => {
            console.error(`Unable to start webcam stream: ${error.message}`);
            this.stopStream(ffmpegProcess);

            if (!response.writableEnded) {
                response.end();
            }
        });

        ffmpegProcess.on("exit", () => {
            if (this.ffmpegProcess === ffmpegProcess) {
                this.ffmpegProcess = null;
            }

            if (!response.writableEnded) {
                response.end();
            }
        });

        response.on("close", () => {
            this.stopStream(ffmpegProcess);
        });
    }

    buildFfmpegArguments() {
        const commonArguments = [
            "-loglevel", "error",
            "-framerate", "15",
            "-video_size", "640x480",
        ];

        if (process.platform === "win32") {
            const device = process.env.WEBCAM_DEVICE;

            if (!device) {
                const error = new Error("WEBCAM_DEVICE must be set to a DirectShow camera name on Windows.");
                error.statusCode = 503;
                throw error;
            }

            return [
                "-f", "dshow",
                ...commonArguments,
                "-i", `video=${device}`,
                "-an",
                "-c:v", "mjpeg",
                "-q:v", "5",
                "-f", "mpjpeg",
                "pipe:1",
            ];
        }

        if (process.platform === "linux") {
            return [
                "-f", "v4l2",
                ...commonArguments,
                "-i", process.env.WEBCAM_DEVICE || "/dev/video0",
                "-an",
                "-c:v", "mjpeg",
                "-q:v", "5",
                "-f", "mpjpeg",
                "pipe:1",
            ];
        }

        const error = new Error(`Webcam streaming is not supported on ${process.platform}.`);
        error.statusCode = 501;
        throw error;
    }

    stopStream(ffmpegProcess = this.ffmpegProcess) {
        if (!ffmpegProcess) {
            return;
        }

        if (this.ffmpegProcess === ffmpegProcess) {
            this.ffmpegProcess = null;
        }

        if (!ffmpegProcess.killed) {
            ffmpegProcess.kill();
        }
    }
}

export default new WebcamService();
