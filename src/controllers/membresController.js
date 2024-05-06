const db = require('../models');
const Membres = db.membres;
const Role = db.roles;
const utils = require('../utils');

const membresController = {


    /**
     * Vérifier si un utilisateur existe
     * Requête GET avec un paramètre 'pseudo' (ex: /users/user123)
     * Retourne true si l'utilisateur existe, false sinon
     */
    async checkIfMembreExists(req, res) {
        try{
            const membres = await Membres.findByPk(req.params.pseudo);
            if(membres){
                return res.status(200).json(true);
            } else {
                return res.status(200).json(false);
            }
        }catch(error){
            return res.status(400).json({error: error.message});
        }
    },


    async CreateUser(req, res) {
        try{
            const exists = await Membres.findByPk(req.body.pseudo);
            if(exists){
                return res.status(400).json({message: "Ce pseudo est déjà utilisé"});
            }

            req.body.role = 1;

            req.body.password = utils.hashPassword(req.body.password);
            let newUser = await Membres.create(req.body);
            newUser = newUser.get({plain: true});
            newUser.password = undefined;
            newUser.email = undefined;
            return res.status(201).json(newUser);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getAllMembres(req, res) {
        try{
            if(req.membres.role !== 2){
                return res.status(403).json({ error: "Vous n'êtes pas autorisé à récupérer tous les utilisateurs" });
            }
            let membres = await Membres.findAll();
            membres.forEach(membre => {
                const plainMembre = membre.get({plain: true});
                plainMembre.password = undefined;
                plainMembre.email = undefined;
                return plainMembre;
        });
        return res.status(200).json(membres);
    } catch(error){
        return res.status(400).json({error: error.message});
    }
},

    async getMembreByPseudo(req, res) {
    try{
        let membre = await Membres.findByPk(req.params.pseudo);
        if(membre){
            membre = membre.get({plain: true});
            delete membre.password;

            if(req.membre.role !== 2 && req.membre.pseudo !== membre.pseudo){
                delete membre.email;
            }
            return res.status(200).json(membre);
        } else {
            return res.status(404).json({error: "Utilisateur non trouvé"});
        } }catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async login(req, res) {
        try{
            const membre = await Membres.findByPk(req.body.pseudo);
            if(membre){
                const match = await utils.comparePassword(req.body.password, membre.password);
                if(match){
                  let returnedMembre = {}
                  returnedMembre.pseudo = membre.pseudo;
                  returnedMembre.role = membre.role;
                  const token = utils.createToken(returnedMembre);
                  returnedMembre.token = token;
                  return res.status(200).json(returnedMembre);
                }else{
                  return res.status(200).json({error: "Identifiants invalides"});
                }
            }else{
                return res.status(200).json({error: "Utilisateur non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async updateMembre(req, res) {
        try{
            if(req.membre.role !== 2 && req.membre.pseudo !== req.params.pseudo){
                return res.status(403).json({error: "Vous n'êtes pas autorisé à modifier cet utilisateur"});
            }

            const membre = await Membres.findByPk(req.params.pseudo);
            if(membre){
                await Membres.update(req.body, {where: {pseudo: req.params.pseudo}});
                return res.status(200).json({message: "Utilisateur modifié"});
            } else {
                return res.status(404).json({error: "Utilisateur non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async deleteMembre(req, res) {
        try{
            if(req.membre.role !== 2 && req.membre.pseudo !== req.params.pseudo){
                return res.status(403).json({error: "Vous n'êtes pas autorisé à supprimer cet utilisateur"});
            }

            const membre = await Membres.findByPk(req.params.pseudo);
            if(membre){
                await Membres.destroy({where: {pseudo: req.params.pseudo}});
                return res.status(200).json({message: "Utilisateur supprimé"});
            } else {
                return res.status(404).json({error: "Utilisateur non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getMembresProjet(req, res) {
        try{
            const membres = await Membres.findAll({
                include: [{
                    model: db.taches,
                    where: {id_projet: req.params.id_projet}
                }]
            });
            return res.status(200).json(membres);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getMembresTache(req, res) {
        try{
            const membres = await Membres.findAll({
                include: [{
                    model: db.taches,
                    where: {id_tache: req.params.id_tache}
                }]
            });
            return res.status(200).json(membres);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async getPointsByMembre(req, res) {
        try{
            const points = await Membres.findByPk(req.params.pseudo, {
                include: [{
                    model: db.points
                }]
            });
            return res.status(200).json(points);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

}

module.exports = membresController;