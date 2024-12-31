const debug = {
    restart: () => {
        console.log("Restarting application...");
    },
    shutdown: () => {
        console.log("Shutting down application...");
    },
    logs: () => {
        console.log("Fetching logs...");
        return ["Log entry 1", "Log entry 2", "Log entry 3"];
    },

    DevMode: (activated, pin) => {
        console.log(activated, pin)
    },

    help: () => {
        console.log(`
          Debug Dev Console Commands:
          - debug.help(): Show this help message
          - debug.restart(): Restart the application
          - debug.shutdown(): Shut down the application
          - debug.logs(): View application logs
        `);
    },
};

// Expose Debug globally
window.Debug = debug;

// Inform the user in the console
console.warn("Debug tools Loaded");