const {Model, DataTypes} = require('sequelize');

class membresTaches extends Model{}

module.exports = (sequelize) => {
    membresTaches.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_membre: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        id_tache: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        }
    }, {
        sequelize,
        tableName: 'membresTaches'
    })
    return membresTaches;
}