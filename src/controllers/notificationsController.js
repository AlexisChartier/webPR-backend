const db = require('../models')
const notifications = db.notifications

const notificationsController = {

    async getNotifications(req, res) {
        try{
            let notifications = await notifications.findAll();
            return res.status(200).json(notifications);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getNotificationByPseudoEmetteur(req, res) {
        try{
            const notification = await notifications.findAll({
                where: {id_emetteur: req.params.pseudo_emetteur}
            });
            return res.status(200).json(notification);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getNotificationByPseudoDestinataire(req, res) {
        try{
            const notification = await notifications.findAll({
                where: {id_destinataire: req.params.pseudo_destinataire}
            });
            return res.status(200).json(notification);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    }
}

module.exports = notificationsController;

