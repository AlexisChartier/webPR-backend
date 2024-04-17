const {Model, DataTypes} = require('sequelize');

class notifications extends Model{}

module.exports = (sequelize) => {
    notifications.init({
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
        id_destinataire: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        id_tache: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        dateEnvoi: {
            type: DataTypes.DATE,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        lu: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'notifications'
    })
    return notifications;
}