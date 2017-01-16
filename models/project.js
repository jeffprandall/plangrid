"use strict";

module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    uid: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    project_id: {
      type: DataTypes.STRING
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Project.hasMany(models.Issue, {
          foreignKey: {
            allowNull: false,
            name: 'uid'
          },
          constraints: false
        }),
        Project.hasMany(models.RFI, {
          foreignKey: {
            allowNull: false,
            name: 'uid'
          },
          constraints: false
        });
      }
    }
  });

  return Project;
};
