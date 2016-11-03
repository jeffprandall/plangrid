'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Issues', 'due_at', { type: Sequelize.DATE }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Issues', 'due_at')
  }
};
