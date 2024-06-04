/**
 * Membres Controller
 * 
 * This controller handles CRUD operations for membres.
 * 
 * Methods:
 * - checkIfMembreExists: Checks if a member exists by pseudo.
 * - CreateUser: Creates a new member.
 * - getAllMembres: Retrieves all members.
 * - getMembreByPseudo: Retrieves a member by pseudo.
 * - login: Authenticates a member and returns a token.
 * - updateMembre: Updates a member by pseudo.
 * - deleteMembre: Deletes a member by pseudo.
 * - getMembresProjet: Retrieves members associated with a project.
 * - getMembresTache: Retrieves members associated with a task.
 * - getPointsByMembre: Retrieves points associated with a member.
 */
const db = require('../models');
const Membres = db.membres;
const Role = db.roles;
const utils = require('../utils');

const membresController = {


    /**
     * Vérifier si un utilisateur existe
     * Requête GET avec un paramètre 'pseudo' (ex: /users/user123)
     * Retourne true si l'utilisateur existe, false sinon
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {string} req.params.pseudo - Pseudo of the member to check
     * @param {Object} res - Express response object
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

    /**
     * Create a new member
     * Requête POST avec un corps de requête contenant les informations du membre
     * 
     * Request Body:
     * {
     *   "pseudo": "string",
     *   "nom": "string",
     *   "prenom": "string",
     *   "email": "string",
     *   "password": "string"
     * }
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.body - Request body
     * @param {string} req.body.pseudo - Pseudo of the new member
     * @param {string} req.body.nom - Last name of the new member
     * @param {string} req.body.prenom - First name of the new member
     * @param {string} req.body.email - Email of the new member
     * @param {string} req.body.password - Password of the new member
     * @param {Object} res - Express response object
     */
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

    /**
     * Get all members
     * Requête GET pour récupérer tous les membres
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.membres - Authenticated member object
     * @param {number} req.membres.role - Role of the authenticated member
     * @param {Object} res - Express response object
     */
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

    /**
     * Get member by pseudo
     * Requête GET avec un paramètre 'pseudo' pour récupérer un membre spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {string} req.params.pseudo - Pseudo of the member to retrieve
     * @param {Object} req.membre - Authenticated member object
     * @param {number} req.membre.role - Role of the authenticated member
     * @param {string} req.membre.pseudo - Pseudo of the authenticated member
     * @param {Object} res - Express response object
     */
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

    /**
     * Login a member
     * Requête POST avec un corps de requête contenant les informations de connexion
     * 
     * Request Body:
     * {
     *   "pseudo": "string",
     *   "password": "string"
     * }
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.body - Request body
     * @param {string} req.body.pseudo - Pseudo of the member
     * @param {string} req.body.password - Password of the member
     * @param {Object} res - Express response object
     */
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

    /**
     * Update a member by pseudo
     * Requête PUT avec un paramètre 'pseudo' et un corps de requête contenant les informations à mettre à jour
     * 
     * Request Body:
     * {
     *   "nom": "string",
     *   "prenom": "string",
     *   "email": "string",
     *   "password": "string"
     * }
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {string} req.params.pseudo - Pseudo of the member to update
     * @param {Object} req.body - Request body
     * @param {Object} req.membre - Authenticated member object
     * @param {number} req.membre.role - Role of the authenticated member
     * @param {string} req.membre.pseudo - Pseudo of the authenticated member
     * @param {Object} res - Express response object
     */
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

    /**
     * Delete a member by pseudo
     * Requête DELETE avec un paramètre 'pseudo' pour supprimer un membre spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {string} req.params.pseudo - Pseudo of the member to delete
     * @param {Object} req.membre - Authenticated member object
     * @param {number} req.membre.role - Role of the authenticated member
     * @param {string} req.membre.pseudo - Pseudo of the authenticated member
     * @param {Object} res - Express response object
     */
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

    /**
     * Get members associated with a project
     * Requête GET avec un paramètre 'id_projet' pour récupérer les membres associés à un projet spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.id_projet - ID of the project
     * @param {Object} res - Express response object
     */
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

    /**
     * Get members associated with a task
     * Requête GET avec un paramètre 'id_tache' pour récupérer les membres associés à une tâche spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.id_tache - ID of the task
     * @param {Object} res - Express response object
     */
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

    /**
     * Get points associated with a member
     * Requête GET avec un paramètre 'pseudo' pour récupérer les points associés à un membre spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {string} req.params.pseudo - Pseudo of the member
     * @param {Object} res - Express response object
     */
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