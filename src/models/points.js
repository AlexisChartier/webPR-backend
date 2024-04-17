const {Model, DataTypes} = require('sequelize');

class points extends Model{}

module.exports = (sequelize) => {
    points.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_tache: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        id_membre: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        dateAttribution: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nombre: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'points'
    })
    return points;
}