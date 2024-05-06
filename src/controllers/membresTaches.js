const db = require('../models')
const membresTaches = db.membresTaches
const taches = db.taches
const membres = db.membres

const membresTachesController = {
    async getMembresTaches(req, res) {
        try{
            let membresTaches = await membresTaches.findAll();
            return res.status(200).json(membresTaches);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getMembreTache(req, res) {
        try{
            const membreTache = await membresTaches.findByPk(req.params.idMembreTache);
            if(membreTache){
                return res.status(200).json(membreTache);
            } else {
                return res.status(404).json({error: "MembreTache non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getMembresByTache(req, res) {
        try{
            const membresTaches = await membresTaches.findAll({
                where: {id_tache: req.params.idTache}
            });
            return res.status(200).json(membresTaches);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getTachesByMembre(req, res) {
        try{
            const membresTaches = await membresTaches.findAll({
                where: {id_membre: req.params.idMembre}
            });
            return res.status(200).json(membresTaches);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async createMembreTache(req, res) {
        try{
            const membreTache = await membresTaches.create(req.body);
            return res.status(201).json(membreTache);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async updateMembreTache(req, res) {
        try{
            const membreTache = await membresTaches.findByPk(req.params.idMembreTache);
            if(membreTache){
                await membresTaches.update(req.body, {where: {id: req.params.idMembreTache}});
                return res.status(200).json({message: "MembreTache modifié"});
            } else {
                return res.status(404).json({error: "MembreTache non trouvé"});
            }
        }
        catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async deleteMembreTache(req, res) {
        try{
            const membreTache = await membresTaches.findByPk(req.params.idMembreTache);
            if(membreTache){
                await membresTaches.destroy({where: {id: req.params.idMembreTache}});
                return res.status(200).json({message: "MembreTache supprimé"});
            } else {
                return res.status(404).json({error: "MembreTache non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    }
}