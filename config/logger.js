"use strict";

const winston = require('winston');

let logger = new winston.Logger({
	level: 'debug',
	handleExceptions: true,
	json: true,
	colorize: true,
	transports: [

		// Log to console
		new winston.transports.Console(),

		//Log to file
		new winston.transports.File({ filename: '../logs/plangrid_logs.logs'})
	]
});

logger.cli();

module.exports = logger;