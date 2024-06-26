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
            primaryKey: true
        },
        pseudo: {
            type: DataTypes.STRING(30),
            allowNull: false,
            primaryKey: true
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