'use strict';

let expect = require('expect');

describe('models/issue', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.Project = require('../../models').Project;
    this.Issue = require('../../models').Issue;
  });

  describe('create', function () {
    it('creates an issue', function () {
      return this.Project.create({ 
        uid: '2134-asdf',  
        project_name: 'A1234 Test Project',
        project_id: 'A1234'
      }).bind(this).then(function (project) {
        return this.Issue.create({ 
          uid: 'asdf-1234', 
          project_id: project.uid,
          title: 'There is an issue'
        }).then(function (issue) {
          expect(issue.title).to.equal('There is an issue');
          expect(issue.project_id).to.equal(project.uid);
        });
      });
    });
  });
});