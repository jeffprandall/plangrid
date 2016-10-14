const models  = require('../models');
const https = require('https');
const PG_config = require('../config/config.json');
const moment = require('moment');
const tz = require('moment-timezone');
const Logger = require('../config/logger');
const Bottleneck = require("bottleneck");

// Set the Rate Limit for the API - 4 per second
const limiter = new Bottleneck(4, 1000);

// create new issue  -- overwrite old by default
function createIssue(project, issue) {

	let now = moment();
	now.tz('America/Los_Angeles').format();

	// convert to string
	let title = issue.title;
	let strTitle = title.toString();
	let description = issue.description;
	let strDescription = description.toString();

	return models.Issue
		.find({ where: { uid: issue.uid }})
		.then((found) => {
			
			// Check if Issue is assigned to anyone
			let assigned_to = (issue.assigned_to != null ? issue.assigned_to[0].email : null);

			// Issue not found so need to create
			if (!found) {
				return models.Issue
					.create({
						uid: issue.uid,
						project_uid: project,
						number: issue.number,
						title: strTitle,
						room: issue.room,
						description: strDescription.substring(0, 1000),
						assigned_to: assigned_to,
						stamp: issue.current_annotation.stamp,
						color: issue.current_annotation.color,
						created_by: issue.created_by.email,
						status: issue.status,
						created_at: issue.created_at,
						updated_at: issue.updated_at,
						updatedAt: now,
						createdAt: now
					})
					.then((issue) => issue)
			} else {
			
			// Issue found so need to update
				return models.Issue
					.update({
						number: issue.number,
						title: strTitle,
						room: issue.room,
						description: strDescription.substring(0, 1000),
						assigned_to: assigned_to,
						stamp: issue.current_annotation.stamp,
						color: issue.current_annotation.color,
						created_by: issue.created_by.email,
						status: issue.status,
						created_at: issue.created_at,
						updated_at: issue.updated_at,
						updatedAt: now,
					},
					{ where: { uid: issue.uid }})
					.then((issue) => issue)
			}
		});
}

// iterate over list of issues
function iterateIssueList(project_uid, issues) {
	let data = issues.data;

	// filter out deleted issues
	data.filter(issue => { return data.deleted != true })
		.forEach(issue => createIssue(project_uid, issue));
}

// get issues with a 1 second delay
function getIssues(project) {
	return new Promise((resolve, reject) => {
		
		console.log(`getting issues for project ${project.uid} `)
		let uid = project.uid;

		let options = {
			hostname: PG_config.plangrid.url,
			path: `/projects/${uid}/issues`,
			auth: PG_config.plangrid.key,
			method: 'GET',
			headers: PG_config.plangrid.headers
		};

		let req = https.request(options, (res) => {
			let data = '';
			
			res.setEncoding('utf8');
			res.on('data', (chunk) => { data += chunk });
			res.on('end', () => {
				let jsonIssues = JSON.parse(data)
				
				// check if there are any issues
				if (Object.keys(jsonIssues.data).length === 0) {
					resolve(uid, jsonIssues);
				} else {
					iterateIssueList(uid, jsonIssues);
					resolve();
				}

			});
		});

		req.on('error', (e) => {
		  console.error(`problem with request: ${e.message}`);
		  reject(e);
		});

		req.end();
	})
}

// iterate over projects to get list of all associated issues
function iterateProjectList(projects) {	

	const promiseIssues = new Promise((resolve, reject) => {
		projects.map(p => {
			console.log(`${p.uid} is running`)
			limiter.schedule(getIssues, p)
		});
	});
	
	return Promise.all(promiseIssues);
}

const getProjectIds = () => models.Project.findAll();

getProjectIds()
.then(projects => iterateProjectList(projects))
.then(issues => createIssue(issues))
.catch((err) => {
	Logger.error(err);
	Logger.close();
	return err;
});