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

      // Generate random numbers 
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }

      // Project variables
      let project_uid = randomString(36);
      let project_name = 'A2222 Test Project for RFIs';
      let project_id = project_name.substring(0,5);
      
      // RFI variables
      let rfi_uid = randomString(36);
      let number = getRandomInt(1,10000)
      let status = 'Open'
      let title = 'Open RFI'
      let assigned_to = 'pm@test.com'
      let sent_date = new Date();
      sent_date.setDate(sent_date.getDate() - 7);
      let due_date = new Date();
      due_date.setDate(due_date.getDate() + 14);
      let created_at = new Date();
      let created_by = 'foreman@test.com'
      let updated_at = new Date();
      let updated_by = 'pm@test.com'

      return this.Project.create({ 
        uid: project_uid,  
        project_name: project_name,
        project_id: project_id
      }).bind(this).then(function (project) {
        return this.RFI.create({ 
          uid: rfi_uid, 
          project_uid: project.uid,
          number: number,
          title: title,
          status: status,
          assigned_to: assigned_to,
          sent_date: sent_date,
          due_date: due_date,
          created_at: created_at,
          created_by: created_by,
          updated_at: updated_at,
          updated_by: updated_by
        }).then(function (rfi) {
          expect(rfi.uid).to.equal(rfi_uid)
          expect(rfi.project_uid).to.equal(project.uid);
          expect(rfi.number).to.equal(number);
          expect(rfi.title).to.equal(title);
          expect(rfi.status).to.equal(status)
        });
      });
    });
  });
});