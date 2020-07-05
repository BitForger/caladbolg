/**
 * @author admin
 */
import {injectable} from "tsyringe";
import {createLogger, format, transports} from "winston";
const {printf, combine, timestamp, colorize, label} = format;

@injectable()
export class Logger {
    private myFormat = printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
    });
    logger = createLogger({
        format: combine(
            label({label: 'caladbolg'}),
            timestamp(),
            colorize(),
            this.myFormat,
        ),
        transports: [
            new transports.Console({
                level: 'debug'
            })
        ]
    });

    info(message, ...args){
        this.logger.log('info', message, args);
    }

    warn(message, ...args) {
        this.logger.log('warn', message, args);
    }
}
