require('dotenv').config()
const { Sequelize } = require('sequelize')
const db_config = require('../config/db')
const db = {}
const sequelize = new Sequelize(db_config.DB, db_config.USER, db_config.PASSWORD, db_config.CONFIG)
//import models
db.membres = require('./membres')(sequelize)
db.membresProjets = require('./membresProjets')(sequelize)
db.membresTaches = require('./membresTaches')(sequelize)
db.notifications = require('./notifications')(sequelize)
db.participations_reu = require('./participations_reu')(sequelize)
db.points = require('./points')(sequelize)
db.projets = require('./projets')(sequelize)
db.taches = require('./taches')(sequelize)
db.roles = require('./roles')(sequelize)
//define associations

//membresProjets belongs to membres
db.membresProjets.belongsTo(db.membres, {foreignKey: 'id_membre'})

//membresProjets belongs to projets
db.membresProjets.belongsTo(db.projets, {foreignKey: 'id_projet'})

//membresTaches belongs to membres
db.membresTaches.belongsTo(db.membres, {foreignKey: 'id_membre'})

//membresTaches belongs to taches
db.membresTaches.belongsTo(db.taches, {foreignKey: 'id_tache'})

//notifications belongs to membres
db.notifications.belongsTo(db.membres, {foreignKey: 'id_membre'})

//notifications belongs to membres
db.notifications.belongsTo(db.membres, {foreignKey: 'id_destinataire'})

//notifications belongs to taches
db.notifications.belongsTo(db.taches, {foreignKey: 'id_tache'})

//participations_reu belongs to membres
db.participations_reu.belongsTo(db.membres, {foreignKey: 'id_membre'})

//members has many participations_reu
db.membres.hasMany(db.participations_reu, {foreignKey: 'id_membre'})

//members has many points
db.membres.hasMany(db.points, {foreignKey: 'id_membre'})

//members has many notifications sent
db.membres.hasMany(db.notifications, {foreignKey: 'id_membre'})

//members has many notifications received
db.membres.hasMany(db.notifications, {foreignKey: 'id_destinataire'})

//members has many taches
db.membres.hasMany(db.membresTaches, {foreignKey: 'id_membre'})

//projets has many projets
db.projets.hasMany(db.membresProjets, {foreignKey: 'id_projet'})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db



