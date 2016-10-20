const expect = require('chai').expect;

describe('models/project', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.Project = require('../../models').Project;
  });

  describe('create', function () {
    it('creates a project', function () {

      // Generate random id
      function randomString(length) {
        return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
      }

      var uid = randomString(36);
      var project_name = 'A1234 Test Project';
      var project_id = project_name.substring(0,5);

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