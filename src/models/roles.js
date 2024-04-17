const { Model, DataTypes } = require('sequelize');

class roles extends Model {}

module.exports = (sequelize) => {
  roles.init({
    idRole: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(100)
    }
  }, {
    sequelize,
    modelName: 'roles',
    timestamps: false,
    freezeTableName: true
  });

  return roles;
};
