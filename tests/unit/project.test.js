'use strict';

let expect = require('expect');

describe('models/project', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
//    this.User = require('../../models').User;
    this.Project = require('../../models').Project;
  });

  describe('create', function () {
    it('creates a project', function () {
      return this.User.create({ username: 'johndoe' }).bind(this).then(function (user) {
        return this.Task.create({ title: 'a title', UserId: user.id }).then(function (task) {
          expect(task.title).to.equal('a title');
        });
      });
    });
  });
});