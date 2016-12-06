'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
    .createTable('Rfis', {
      uid: {
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
      },
      project_uid: Sequelize.STRING,
      number: Sequelize.INTEGER,        // PlanGrid RFI ID
      status: Sequelize.STRING,         // PlanGrid Status
      title: Sequelize.STRING,
      locked: Sequelize.STRING,
      question: Sequelize.STRING(1000),
      answer: Sequelize.STRING(1000),
      comments: Sequelize.STRING(1000),
      assigned_to: Sequelize.STRING,
      sent_date: Sequelize.DATE,
      due_date: Sequelize.DATE,
      created_at: Sequelize.DATE,       // PlanGrid Date Created
      created_by: Sequelize.STRING,     // Who created the job in PlanGrid
      updated_at: Sequelize.DATE,       // PlanGrid Date Created
      updated: Sequelize.STRING,        // Who created the job in PlanGrid
      updatedAt: Sequelize.DATE,        // System time stamps
      createdAt: Sequelize.DATE
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
    .dropTable('Rfis');
  }
};