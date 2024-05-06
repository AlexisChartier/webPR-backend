const {Model, DataTypes} = require('sequelize');

class membresTaches extends Model{}

module.exports = (sequelize) => {
    membresTaches.init({
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
        id_tache: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    }, {
        sequelize,
        tableName: 'membresTaches'
    })
    return membresTaches;
}