const expect = require('chai').expect;
const Bluebird = require('bluebird');

// Generate random id
function randomString(length) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

// Sample Project to create
let uid = randomString(36);
let project_name = 'A1234 Test Project';
let project_id = project_name.substring(0,5);

describe('models/project test', function () {
  before(function () {
    return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.Project = require('../../models').Project;
  });

  after(function () {
    this.Project = require('../../models').Project;
    return Bluebird.all([this.Project.destroy({ truncate: true })]);
  });

  describe('create a Project from the Model', function () {
    it('a single project', function () {

      return this.Project.create({ 
        uid: uid,
        project_name: project_name,
        project_id: project_id
      }).bind(this).then(function (project) {
        expect(project.uid).to.equal(uid);
        expect(project.project_name).to.equal('A1234 Test Project');
        expect(project.project_id).to.equal(project_id);
      });
    });
  });
});

describe('controllers/projects test', function () {
  before(function () {
    return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.Project = require('../../controllers/projects/controller');
  });

  after(function () {
    this.Project = require('../../models').Project;
    return Bluebird.all([this.Project.destroy({ truncate: true })]);
  });

  describe('create a project from the controller', function () {
    it('a single project', function () {

      return this.Project.createProject({ 
        uid: uid,
        name: project_name
      }).bind(this).then(function (project) {
        console.log(project.uid, uid)
        expect(project.uid).to.equal(uid);
        expect(project.project_name).to.equal('A1234 Test Project');
        expect(project.project_id).to.equal(project_id);
      });
    });
  });
});
