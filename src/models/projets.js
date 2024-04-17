const {Model, DataTypes} = require('sequelize');

class projets extends Model{}
    
module.exports = (sequelize) => {
    projets.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        dateCreation: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateFin: {
            type: DataTypes.DATE,
            allowNull: false
        },
        id_createur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        }
    }, {
        sequelize,
        tableName: 'projets'
    })
    return projets;
}