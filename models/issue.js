"use strict";

module.exports = function(sequelize, DataTypes) {
  var Issue = sequelize.define("Issue", {
    uid: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    project_uid: DataTypes.STRING,
    number: DataTypes.INTEGER,
    title: DataTypes.STRING,
    room: DataTypes.STRING,
    description: DataTypes.STRING(1000),
    assigned_to: DataTypes.STRING,
    stamp: DataTypes.STRING,
    color: DataTypes.STRING,
    created_by: DataTypes.STRING,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
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