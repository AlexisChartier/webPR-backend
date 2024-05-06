const {Model, DataTypes} = require('sequelize');

class participations_reu extends Model{}

module.exports = (sequelize) => {
    participations_reu.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pseudo: {
            type: DataTypes.STRING(30),
            allowNull: false,
            primaryKey: true
        },
        date_reu: {
            type: DataTypes.DATE,
            allowNull: false,
            foreignKey: true
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'participations_reu'
    })
    return participations_reu;
}