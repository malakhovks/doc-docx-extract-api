import winston from "winston";
import config from "config";

const MODE = config.get("log-mode");

winston.emitErrs = true;
const tsFormat = () => (new Date().toLocaleString());
const log = new winston.Logger({exitOnError: false});

if (MODE === 'production') {
	log.add(winston.transports.Console, {
		colorize: true,
		prettyPrint: true,
		handleExceptions: true,
		timestamp: tsFormat,
		level: 'error'
	});
}

if (MODE === 'development') {
	log.add(winston.transports.Console, {
		colorize: true,
		json: false,
		prettyPrint: true,
		handleExceptions: true,
		timestamp: tsFormat,
		//label: module.filename.split('/').slice(-2).join('/'),
		level: 'debug'
	});
}

module.exports = log;
module.exports.stream = {
	write: function (message, encoding) {
		log.debug(message.trim());
	}
};




