const schedule = require('node-schedule');
const Logger = require('./config/logger');
const http = require('http')

// Set ENV variables
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

// Reference controllers
const Projects = require('./controllers/projects/controller');
const Issues = require('./controllers/issues/controller');
const RFIs = require('./controllers/rfis/controller');

// Project Schedule to poll the API
let ProjectRule = new schedule.RecurrenceRule();
ProjectRule.minute = 01;  // Runs 01 minutes after every hour

var pj = schedule.scheduleJob(ProjectRule, () => {
	let now = new Date();
	Logger.info('Projects scheduled task started: ', now);
	Projects.getProjects();
});

// Issue Schedule to poll the API
let IssueRule = new schedule.RecurrenceRule();
IssueRule.minute = 03;  // Runs 03 minutes after every hour

var ij = schedule.scheduleJob(IssueRule, () => {
	let now = new Date();
	Logger.info('Issues scheduled task started: ', now);
	Issues.getAllIssues();
});

// RFI Schedule to poll the API
let RFIRule = new schedule.RecurrenceRule();
RFIRule.minute = 05;  // Runs 05 minutes after every hour

var rj = schedule.scheduleJob(RFIRule, () => {
	let now = new Date();
	Logger.info('RFIs scheduled task started: ', now);
	RFIs.getAllRFIs();
});

// Listening - primarily for PM2 to monitor status of application
const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'})
	res.write(JSON.stringify(req.headers))
	res.end(`${ env } server is running`)
})

server.listen(8080);

Logger.info(`Successfully started ${ env } and waiting for jobs to run`)