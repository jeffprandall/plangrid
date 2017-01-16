const expect = require('chai').expect;

describe('models/index', function () {
  it('returns the Project model', function () {
    let models = require('../../models');
    expect(models.Project).to.be.ok;
  });

  it('returns the Issue model', function () {
    let models = require('../../models');
    expect(models.Issue).to.be.ok;
  });

  it('returns the RFI model', function () {
    let models = require('../../models');
    expect(models.RFI).to.be.ok;
  });
});