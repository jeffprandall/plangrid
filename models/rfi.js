"use strict";

module.exports = function(sequelize, DataTypes) {
  var Issue = sequelize.define("Issue", {
    uid: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    project_uid: DataTypes.STRING,
    number: DataTypes.INTEGER,        // PlanGrid RFI ID
    status: DataTypes.STRING,         // PlanGrid Status
    title: DataTypes.STRING,
    locked: DataTypes.STRING,
    question: DataTypes.STRING(1000),
    answer: DataTypes.STRING(1000),
    comments: DataTypes.STRING(1000),
    assigned_to: DataTypes.STRING,
    sent_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    created_at: DataTypes.DATE,       // PlanGrid Date Created
    created_by: DataTypes.STRING,     // Who created the job in PlanGrid
    updated_at: DataTypes.DATE,       // PlanGrid Date Created
    updated: DataTypes.STRING,        // Who created the job in PlanGrid
    updatedAt: DataTypes.DATE,        // System time stamps
    createdAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Issue.belongsTo(models.Project, {
          foreignKey: {
            allowNull: false,
            name: 'uid'
          }
        });
      }
    }
  });

  return Issue;
};