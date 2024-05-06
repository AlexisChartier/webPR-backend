const {Model, DataTypes} = require('sequelize');

class membres extends Model{}

module.exports = (sequelize) => {
    membres.init({
        pseudo: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        dateInscription: {
            type: DataTypes.DATE,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'membres'
    })
    return membres;
}