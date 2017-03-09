const schedule = require('node-schedule');
const Logger = require('./config/logger');

// Reference controllers
const Projects = require('./controllers/projects/controller');
const Issues = require('./controllers/issues/controller');
const RFIs = require('./controllers/rfis/controller');

// Start up notes
//console.log(`plangrid-js is starting up, ${ NODE_ENV } || 'development'`)

// Project Schedule to poll the API
let ProjectRule = new schedule.RecurrenceRule();
ProjectRule.minute = 30;  // Runs 57 minutes after every hour

var pj = schedule.scheduleJob(ProjectRule, () => {
	let now = new Date();
	Logger.info('Projects scheduled task started: ', now);
	Projects.getProjects();
});

// Issue Schedule to poll the API
let IssueRule = new schedule.RecurrenceRule();
IssueRule.minute = 32;  // Runs 58 minutes after every hour

var ij = schedule.scheduleJob(IssueRule, () => {
	let now = new Date();
	Logger.info('Issues scheduled task started: ', now);
	Issues.getAllIssues();
});

// RFI Schedule to poll the API
let RFIRule = new schedule.RecurrenceRule();
RFIRule.minute = 34;  // Runs 58 minutes after every hour

var rj = schedule.scheduleJob(RFIRule, () => {
	let now = new Date();
	Logger.info('RFIs scheduled task started: ', now);
	RFIs.getAllRFIs();
});