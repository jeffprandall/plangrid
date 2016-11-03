const expect = require('chai').expect;
const Bluebird = require('bluebird');

// import in the api config settings
const config = require('../../config/config');

let firstProject;

describe('saving a project from the api', function () {
	before(() => {
		this.Project = require('../../controllers/projects/controller');
	});

	after(() => {

	});

	it('should receive a successful connection from the api')
	it('should return some projects', () => {
		return this.Project.getProjectsFromPlanGrid()
		.then((projects) => {
			console.log(projects);
			firstProject = projects;
			expect(projects.total_count).to.be.above(1);
		})
	})
	it('should save the first project to the local database', (firstProject) => {
		
		// convert to JSON
		//let data = JSON.parse(firstProject);
		//console.log(firstProject.data);
		return this.Project.createProject(data)
		.then((project) => {
			console.log(project)
			expect(project)
		})
	})
	it('should return the project from the database')
})