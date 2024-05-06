const {Model, DataTypes} = require('sequelize');

class membresProjets extends Model{}

module.exports = (sequelize) => {
    membresProjets.init({
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
        id_projet: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    }, {
        sequelize,
        tableName: 'membresProjets'
    })
    return membresProjets;
}