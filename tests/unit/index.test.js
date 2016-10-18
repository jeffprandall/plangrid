'use strict';

let expect = require('expect');

describe('models/index', function () {
  it('returns the Projects model', function () {
    var models = require('../../models');
    expect(models.Project).to.be.ok();
  });

  it('returns the Issues model', function () {
    var models = require('../../models');
    expect(models.Issue).to.be.ok();
  });
});