const schedule = require('node-schedule');

// Reference controllers
const Projects = require('./controllers/projects/controller');
const Issues = require('./controllers/issues/controller');

// Project Schedule to poll the API
let pRule = new schedule.RecurrenceRule();
pRule.minute = 05;  // Runs 5 minutes after every hour

var pj = schedule.scheduleJob(pRule, () => {
	Projects.getProjects();
	console.log('project tasks should start running here.')
});

// Issue Schedule to poll the API
let iRule = new schedule.RecurrenceRule();
iRule.minute = 15;  // Runs 5 minutes after every hour

var ij = schedule.scheduleJob(iRule, () => {
	Issues.getIssues();
	console.log('issues tasks should start running here.')
});