const winston = require('winston'),
    expressWinston = require('express-winston');

class logUtils {
    static setup() {
        expressWinston.requestWhitelist.push('body');
        expressWinston.responseWhitelist.push('body');
        expressWinston.bodyBlacklist.push('idToken');
    }

    static initDebugLogging(app) {

        this.setup();

        app.use(expressWinston.logger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.json()
            ),
            ignoreRoute: function (req, res) {
                if (req.url == '/favicon.ico' || req.url.includes('/api-docs/')) {
                    return true;
                }
                return false;
            },

        }));

    }

    static initErrorLogging(app) {
        this.setup();

        app.use(expressWinston.errorLogger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.json()
            )
        }));
    }
}

module.exports = logUtils;