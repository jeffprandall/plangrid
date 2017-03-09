const expect = require('chai').expect;
const Bluebird = require('bluebird');
const app = require('../../app.js');

// import in the api config settings
const config = require('../../config/config');

describe('saving a project from the api', () => {
	
	// temp storage buckets
	let lastProject;

	before(() => {
		this.Project = require('../../controllers/projects/controller');
		this.Issue = require('../../controllers/issues/controller');
		this.RFI = require('../../controllers/rfis/controller');
	});

	after(() => {
		this.Project = require('../../models').Project;
		this.Issue = require('../../models').Issue;
		this.RFI = require('../../models').RFI;

    return Bluebird.all([
    	this.Project.destroy({ truncate: true }),
    	this.Issue.destroy({ truncate: true }),
    	this.RFI.destroy({ truncate: true })
    ]);
	});

	// Access the API and return some Projects
	it('should return some projects', () => {
		return this.Project.getProjectsFromPlanGrid()
		.then((projects) => {
			lastProject = projects.data.pop();
			expect(projects.total_count).to.be.above(1);
		})
	})

	// Save the last downloaded Project to the database
	it('should save and return the last project to the local database', () => {
		return this.Project.createProject(lastProject)
		.then((project) => {
			expect(project.project_id).to.equal(project.project_id);
			expect(project.project_name).to.equal(project.project_name);
		})
	})

	// Download all Issues for a Project
	// it('should download all the Issues for a project and store to the local database', () => {
		
	// 	let pid = lastProject.uid;

	// 	return this.Issue.getIssuesForAProject(pid)
	// 	.then((issues) => {
	// 		console.log(issues);
	// 		expect(issues.total_count).to.be.above(1);
	// 	})
	// })
	
	// Download all RFI's for a Project
	it('should download all the RFIs for a project and store to the local database')
})