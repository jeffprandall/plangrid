"use strict";

module.exports = function(sequelize, DataTypes) {
  var RFI = sequelize.define("RFI", {
    uid: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    project_uid: DataTypes.STRING,    // PlanGrid Project ID
    number: DataTypes.INTEGER,        // PlanGrid RFI ID
    status: DataTypes.STRING,         // PlanGrid Status
    title: DataTypes.STRING,
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
        RFI.belongsTo(models.Project, {
          foreignKey: {
            allowNull: false,
            name: 'uid'
          },
          constraints: false
        });
      }
    }
  });

  return RFI;
};