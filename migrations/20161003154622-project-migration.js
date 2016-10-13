'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
    .createTable('Projects', {
      uid: Sequelize.STRING,
      project_name: Sequelize.STRING,
      project_id: Sequelize.STRING,
      created_at: Sequelize.DATE, // date PG project was created
      updated_at: Sequelize.DATE, // date PG project was updated
      updatedAt: Sequelize.DATE,  // date this record was updated
      createdAt: Sequelize.DATE   // date this record was created
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
    .dropTable('Projects');
  }
};
