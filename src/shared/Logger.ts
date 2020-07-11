/**
 * @author admin
 */
import {injectable} from "tsyringe";
import {createLogger, format, transports} from "winston";
const {combine, timestamp, label, json, prettyPrint} = format;

@injectable()
export class Logger {
    private combinedFormats = process.env.NODE_ENV === 'dev' ?
        combine(
            label({label: 'caladbolg'}),
            timestamp(),
            json(),
            prettyPrint(),
        ) :
        combine(
            label({label: 'caladbolg'}),
            timestamp(),
            json(),
        );
    logger = createLogger({
        format: this.combinedFormats,
        transports: [
            new transports.Console({
                level: 'debug'
            })
        ]
    });

    info(message, ...args){
        this.logger.log('info', `${message}`, {args});
    }

    warn(message, ...args) {
        this.logger.log('warn', `${message}`, {args});
    }

    error(message, ...args) {
        this.logger.log('error', `${message}`, {args});
    }
}
