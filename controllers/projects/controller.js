const models  = require('../../models');
const https = require('https');
const PG_config = require('../../config/config');
const moment = require('moment');
const tz = require('moment-timezone');
const Logger = require('../../config/logger');

// save to database
function createProject(project) {

	let now = moment();
	now.tz('America/Los_Angeles').format();
	let pid = project.name.substring(0, 5) // adjust according to your needs

	return models.Project
	.findOrCreate({
		where: { uid: project.uid },
		defaults: { 
			project_name: project.name,
			project_id: pid,
			updatedAt: now
		},
	})
	.spread((project, created) => {
		return project;
	})
}

// iterator over list
const iterateProjectlist = (projects) => {
	let data = projects.data;
	data.forEach(project => createProject(project));
}

// get projects
const getProjectsFromPlanGrid = () => {

	return new Promise((resolve, reject) => {
		let options = {
			hostname: PG_config.plangrid.url,
			path: '/projects',
			auth: PG_config.plangrid.key,
			method: 'GET',
			headers: PG_config.plangrid.headers
		};

		let req = https.request(options, (res) => {
			let data = '';
			
			res.setEncoding('utf8');
			res.on('data', (chunk) => { data += chunk });
			res.on('end', () => {
				let jsonProjects = JSON.parse(data);
				resolve(jsonProjects);
			});
		});

		req.on('error', (e) => {
		  Logger.error(`problem with request: ${e.message}`);
		  reject(e);
		});

		req.end();
	})
}

// Main function to poll the API and create projects
exports.getProjects = () => {
	getProjectsFromPlanGrid()
	.then(projects => iterateProjectlist(projects))
	.then(result => Logger.info(result))
	.catch(err => Logger.error(err))
}

// Create a single Project
exports.createProject = createProject;

// Poll the api
exports.getProjectsFromPlanGrid = getProjectsFromPlanGrid;