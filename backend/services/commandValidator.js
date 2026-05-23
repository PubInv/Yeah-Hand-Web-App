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

    const parts = command.trim().split(/\s+/);

    const commandName = parts[0];
    const closureValue = parts[1];

    // Validate command name
    if (!VALID_COMMANDS.includes(commandName)) {
        return {
            valid: false,
            error: `Invalid command: ${commandName}`,
        };
    }

    // Validate optional closure percentage
    if (closureValue !== undefined) {
        const closureNumber = Number(closureValue);

        if (
            !Number.isInteger(closureNumber) ||
            closureNumber < 0 ||
            closureNumber > 100
        ) {
            return {
                valid: false,
                error: "Closure value must be an integer between 0 and 100.",
            };
        }
    }

    return {
        valid: true,
    };
}