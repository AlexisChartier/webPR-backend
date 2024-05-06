const db = require('../models')
const participations = db.participations_reu

const participationsController = {

    async getParticipations(req, res) {
        try{
            let participations = await participations.findAll();
            return res.status(200).json(participations);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getParticipationByPseudo(req, res) {
        try{
            const participation = await participations.findAll({
                where: {pseudo: req.params.pseudo}
            });
            return res.status(200).json(participation);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getParticipationByDateReu(req, res) {
        try{
            const participation = await participations.findAll({
                where: {date_reu: req.params.date_reu}
            });
            return res.status(200).json(participation);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    }
}