import winston from "winston";

winston.emitErrs = true;
const tsFormat = () => (new Date().toLocaleString());
const log = new winston.Logger({exitOnError: false});

if (process.env.NODE_ENV === 'production') {
	log.add(winston.transports.Console, {
		colorize: true,
		prettyPrint: true,
		timestamp: tsFormat,
		level: 'error'
	});
} else {
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