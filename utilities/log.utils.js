const winston = require('winston'),
    expressWinston = require('express-winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const packageInfo = require('../package.json');

class logUtils {
    static setup() {
        expressWinston.requestWhitelist.push('body');
        expressWinston.responseWhitelist.push('body');
        expressWinston.bodyBlacklist.push('idToken');
    }

    static initDebugLogging(app) {

        this.setup();

        app.use(expressWinston.logger({
            statusLevels: {
                "success": "info",
                "warn": "warn",
                "error": "error"
            },
            transports: [
                new winston.transports.Console(),
                new DailyRotateFile({
                    zippedArchive: false,
                    dirname: './logs',
                    filename: packageInfo.name + "(" + packageInfo.version + ")" + '_' + "%DATE%" + ".log",
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: '30d'
                }),
            ],
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            /* ignoreRoute: function (req, res) {
                if (req.url.includes('/api-docs/')) {
                    return true;
                }
                return false;
            }, */

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