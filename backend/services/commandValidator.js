const VALID_COMMANDS = [
    "POWER",
    "POWERSMALL",
    "MONKEY",
    "PINCH",
    "RELAX",
];

export function validateCommand(command) {
    if (!command || typeof command !== "string") {
        return {
            valid: false,
            error: "Command must be a string.",
        };
    }

    const trimmedCommand = command.trim();

    // Accept gesture commands by themselves
    if (VALID_COMMANDS.includes(trimmedCommand)) {
        return {
            valid: true,
        };
    }

    // Accept factor values by themselves
    const factor = Number(trimmedCommand);

    if (
        Number.isInteger(factor) &&
        factor >= 0 &&
        factor <= 100
    ) {
        return {
            valid: true,
        };
    }

    return {
        valid: false,
        error: "Command must be a valid gesture or an integer between 0 and 100.",
    };
}