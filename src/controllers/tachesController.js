const db = require('../models');
const utils = require('../utils');

const Tache = db.taches;

const tachesController = {
    async createTache(req, res) {
        try{
            const tache = await Tache.create(req.body);
            return res.status(201).json(tache);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async updateTache(req, res) {
        try{
            const tache = await Tache.findByPk(req.params.idTache);
            if(tache){
                await Tache.update(req.body, {where: {id: req.params.idTache}});
                return res.status(200).json({message: "Tâche modifiée"});
            } else {
                return res.status(404).json({error: "Tâche non trouvée"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    }, 

    async deleteTache(req, res) {
        try{
            const tache = await Tache.findByPk(req.params.idTache);
            if(tache){
                await Tache.destroy({where: {id: req.params.idTache}});
                return res.status(200).json({message: "Tâche supprimée"});
            } else {
                return res.status(404).json({error: "Tâche non trouvée"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getTachesByMembre(req, res) {
        try{
            const taches = await Tache.findAll({
                include: [{
                    model: db.membresTaches,
                    where: {id_membre: req.membre.idMembre}
                }]
            });
            return res.status(200).json(taches);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getAlltaches(req, res) {
        try{
            const taches = await Tache.findAll();
            return res.status(200).json(taches);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    }
}

module.exports = tachesController;