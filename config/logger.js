require('dotenv').config()

const winston = require('winston');
require('winston-syslog').Syslog

let logger = new winston.Logger({
	levels: winston.config.syslog.levels,
	handleExceptions: true,
	json: true,
	colors: winston.config.syslog.colors,
	transports: [

		// Log to console
		new winston.transports.Console(),

		// Log to file
		new winston.transports.File({ filename: 'logs/plangrid_logs.logs'}),

		// Send to syslog server and set the log levels
		new winston.transports.Syslog({ 
			host: process.env.SYSLOG_SERVER,
			protocol: 'udp4',
      json: false 
    })
	]
});

logger.cli();

module.exports = logger;