const fs = require('fs');
const path = require('path');

class RequestLogger {
    constructor(logFolderPath = './logs') {
        this.logFolderPath = logFolderPath;
        this.ensureLogFolderExists();
    }

    ensureLogFolderExists() {
        if (!fs.existsSync(this.logFolderPath)) {
            fs.mkdirSync(this.logFolderPath);
        }
    }

    logRequest(req, res, next) {
        const today = new Date().toISOString().split('T')[0];
        const logFileName = `${today}.txt`;
        const logFilePath = path.join(this.logFolderPath, logFileName);
        const timestamp = new Date().toISOString();
        const method = req.method;
        const url = req.url;
        const cookies = JSON.stringify(req.cookies || {});

        const logData = `${today} - ${method} ${url} - ${req.header} - Cookies: ${cookies}\n`;


        fs.appendFile(logFilePath, logData, (err) => {
            if (err) {
                console.error(`Error writing to log file: ${err}`);
            }
        });

        next();
    }
}

module.exports = RequestLogger;
