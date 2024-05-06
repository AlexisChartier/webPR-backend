const {Model, DataTypes} = require('sequelize');

class taches extends Model{}

module.exports = (sequelize) => {
    taches.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_projet: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        pseudo_membre: {
            type: DataTypes.STRING(30),
            allowNull: false,
            foreignKey: true
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateCreation: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateEcheance: {
            type: DataTypes.DATE,
            allowNull: false
        },
        statut: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'taches'
    })
    return taches;
}