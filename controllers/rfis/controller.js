const models  = require('../../models');
const https = require('https');
const PG_config = require('../../config/config.json');
const moment = require('moment');
const tz = require('moment-timezone');
const Logger = require('../../config/logger');

const RATE_LIMIT = PG_config.plangrid.rate_limit;

// create new rfi  -- overwrite old by default
function createRFI(project, rfi) {

	let now = moment();
	now.tz('America/Los_Angeles').format();

	// convert to string
	let title = rfi.title;
	let strTitle = title.toString();
	let description = rfi.description;
	let strDescription = description.toString();

	return models.rfi
		.find({ where: { uid: rfi.uid }})
		.then((found) => {
			
			// Check if rfi is assigned to anyone
			let assigned_to = (rfi.assigned_to != null ? rfi.assigned_to[0].email : null);

			// rfi not found so need to create
			if (!found) {
				return models.rfi
					.create({
						uid: rfi.uid,
						project_uid: project,
						number: rfi.number,
						status: rfi.status,
						title: strTitle,
						locked: rfi.locked,
						question: rfi.question,
						answer: rfi.answer,
						comments: rfi.comments,
						assigned_to: assigned_to,
						sent_date: rfi.sent_date,
						due_date: rfi.due_date,
						created_at: rfi.created_at,
						created_by: rfi.created_by,
						updated_at: rfi.updated_at,
						updated_by: rfi.updated_by,
						updatedAt: now,
						createdAt: now
					})
					.then((rfi) => rfi)
					.catch((err) => {
						Logger.error(err);
						Logger.close();
						return err;
					});
			} else {
			
			// rfi found so need to update
				return models.rfi
					.update({
						status: rfi.status,
						title: strTitle,
						locked: rfi.locked,
						question: rfi.question,
						answer: rfi.answer,
						comments: rfi.comments,
						assigned_to: assigned_to,
						sent_date: rfi.sent_date,
						due_date: rfi.due_date,
						updated_at: rfi.updated_at,
						updated_by: rfi.updated_by,
						updatedAt: now,
						createdAt: now
					},
					{ where: { uid: rfi.uid }})
					.then((rfi) => rfi)
					.catch((err) => {
						Logger.error(err);
						Logger.close();
						return err;
					});
			}
		})
}

// iterate over list of issues
const iterateRFIList = (project_uid, rfis) => {
	
	let data = rfis.data;

	// create the rfi
	data.forEach(rfi => createRFI(project_uid, rfi));
}

// get issues with a 1 second delay
const getRFIs = (projectId) => {
	
	return new Promise((resolve, reject) => {

		let uid = projectId;

		let options = {
			hostname: PG_config.plangrid.url,
			path: `/projects/${uid}/rfis`,
			auth: PG_config.plangrid.key,
			method: 'GET',
			headers: PG_config.plangrid.headers
		};

		let req = https.request(options, (res) => {
			let data = '';
			
			res.setEncoding('utf8');
			res.on('data', (chunk) => { data += chunk });
			res.on('end', () => {
				let jsonRFIs = JSON.parse(data)

				// check if there are any issues
				if (Object.keys(jsonRFIs.data).length === 0) {
					resolve(uid, jsonRFIs);
				} else {
					iterateRFIList(uid, jsonRFIs);
					resolve();
				}

			});
		});

		req.on('error', (e) => {
			Logger.error(e.message);
			Logger.close();
		 	reject(e);
		});

		req.end();
	})
}

// iterate over projects to get a list of all associated RFI's
const iterateProjectsList = (projectIds) => {

	const rfiPromises = projectIds.map(id => new Promise((resolve, reject) => {

		setTimeout(() => {
			resolve (getRFIs(id));
		}, RATE_LIMIT);

	}));

	return Promise.all(rfiPromises);
}

// get a list of all the projects and return their uid
const getProjectIds = () => models.Project.findAll()
	.then(projects => projects.map(p => p.dataValues.uid));

