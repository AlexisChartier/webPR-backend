const db = require('../models')
const membresProjets = db.membresProjets
const projets = db.projets
const membres = db.membres

const membresProjetsController = {
    async getMembresProjets(req, res) {
        try{
            let membresProjets = await membresProjets.findAll();
            return res.status(200).json(membresProjets);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getMembreProjet(req, res) {
        try{
            const membreProjet = await membresProjets.findByPk(req.params.idMembreProjet);
            if(membreProjet){
                return res.status(200).json(membreProjet);
            } else {
                return res.status(404).json({error: "MembreProjet non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getMembresByProjet(req, res) {
        try{
            const membresProjets = await membresProjets.findAll({
                where: {id_projet: req.params.idProjet}
            });
            return res.status(200).json(membresProjets);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getProjetsByMembre(req, res) {
        try{
            const membresProjets = await membresProjets.findAll({
                where: {id_membre: req.params.idMembre}
            });
            return res.status(200).json(membresProjets);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async createMembreProjet(req, res) {
        try{
            const membreProjet = await membresProjets.create(req.body);
            return res.status(201).json(membreProjet);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async updateMembreProjet(req, res) {
        try{
            const membreProjet = await membresProjets.findByPk(req.params.idMembreProjet);
            if(membreProjet){
                await membresProjets.update(req.body, {where: {id: req.params.idMembreProjet}});
                return res.status(200).json({message: "MembreProjet modifié"});
            } else {
                return res.status(404).json({error: "MembreProjet non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async deleteMembreProjet(req, res) {
        try{
            const membreProjet = await membresProjets.findByPk(req.params.idMembreProjet);
            if(membreProjet){
                await membresProjets.destroy({where: {id: req.params.idMembreProjet}});
                return res.status(200).json({message: "MembreProjet supprimé"});
            } else {
                return res.status(404).json({error: "MembreProjet non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    }

}