'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
    .createTable('Issues', {
      uid: Sequelize.STRING,
      project_uid: Sequelize.STRING,
      number: Sequelize.INTEGER,
      title: Sequelize.STRING,
      room: Sequelize.STRING,
      description: Sequelize.STRING(1000),
      assigned_to: Sequelize.STRING,
      stamp: Sequelize.STRING,
      color: Sequelize.STRING,
      created_by: Sequelize.STRING,
      status: Sequelize.STRING,
      due_at: Sequelize.DATE,
      created_at: Sequelize.DATE, // date PG issue was created
      updated_at: Sequelize.DATE, // date PG issue was updated
      updatedAt: Sequelize.DATE,  // date this record was updated
      createdAt: Sequelize.DATE   // date this record was created
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
    .dropTable('Issues');
  }
};
