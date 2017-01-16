const expect = require('chai').expect;
const Bluebird = require('bluebird');

describe('models/rfi', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.RFI = require('../../models').RFI;
    this.Project = require('../../models').Project;
  });

  // Truncate the Projects table
  after(function () {
    this.Project = require('../../models').Project;
    return Bluebird.all([this.Project.destroy({ truncate: true })]);
  });

  // Delete the RFI the test created
  afterEach(function () {
    this.RFI = require('../../models').RFI;
    return Bluebird.all([this.RFI.destroy({ truncate: true })]);
  });

  describe('create an RFI from the Model', function () {
    it('creates an rfi', function () {
      
      // Generate random id
      function randomString(length) {
        return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
      }

      var project_uid = randomString(36);
      var project_name = 'A2222 Test Project for RFIs';
      var project_id = project_name.substring(0,5);
      var rfi_uid = randomString(36);

      return this.Project.create({ 
        uid: project_uid,  
        project_name: project_name,
        project_id: project_id
      }).bind(this).then(function (project) {
        return this.RFI.create({ 
          uid: rfi_uid, 
          project_uid: project.uid,
          title: 'There is an RFI'
        }).then(function (issue) {
          expect(issue.title).to.equal('There is an RFI');
          expect(issue.project_uid).to.equal(project.uid);
        });
      });
    });
  });
});