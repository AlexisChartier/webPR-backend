const db = require('../models');
const utils = require('../utils');

const Projet = db.projets;

const projetsController = {

    async getAllProjets(req, res) {
        try{
            let projets = await Projet.findAll();
            return res.status(200).json(projets);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getProjet(req, res) {
        try{
            const projet = await Projet.findByPk(req.params.idProjet);
            if(projet){
                return res.status(200).json(projet);
            } else {
                return res.status(404).json({error: "Projet non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getProjetByMembre(req, res) {
        try{
            const projets = await Projet.findAll({
                include: [{
                    model: db.membresProjets,
                    where: {id_membre: req.membre.idMembre}
                }]
            });
            return res.status(200).json(projets);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async createProjet(req, res) {
        try{
            const projet = await Projet.create(req.body);
            return res.status(201).json(projet);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async updateProjet(req, res) {
        try{
            const projet = await Projet.findByPk(req.params.idProjet);
            if(projet){
                await Projet.update(req.body, {where: {id: req.params.idProjet}});
                return res.status(200).json({message: "Projet modifié"});
            } else {
                return res.status(404).json({error: "Projet non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async deleteProjet(req, res) {
        try{
            const projet = await Projet.findByPk(req.params.idProjet);
            if(projet){
                await Projet.destroy({where: {id: req.params.idProjet}});
                return res.status(200).json({message: "Projet supprimé"});
            } else {
                return res.status(404).json({error: "Projet non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    }

}

module.exports = projetsController;