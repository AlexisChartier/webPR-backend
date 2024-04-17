const {Model, DataTypes} = require('sequelize');

class membresProjets extends Model{}

module.exports = (sequelize) => {
    membresProjets.init({
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
        id_projet: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        }
    }, {
        sequelize,
        tableName: 'membresProjets'
    })
    return membresProjets;
}