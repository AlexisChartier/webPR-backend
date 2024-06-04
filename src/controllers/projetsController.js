/**
 * Projets Controller
 * 
 * This controller handles CRUD operations for projets.
 * 
 * Methods:
 * - getAllProjets: Retrieves all projets.
 * - getProjet: Retrieves a projet by ID.
 * - getProjetByMembre: Retrieves projets by member ID.
 * - createProjet: Creates a new projet.
 * - updateProjet: Updates a projet by ID.
 * - deleteProjet: Deletes a projet by ID.
 */

const db = require('../models');
const utils = require('../utils');

const Projet = db.projets;

const projetsController = {


    /**
     * Get all projets
     * Requête GET pour récupérer tous les projets
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async getAllProjets(req, res) {
        try{
            let projets = await Projet.findAll();
            return res.status(200).json(projets);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

        /**
     * Get projet by ID
     * Requête GET avec un paramètre 'idProjet' pour récupérer un projet spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idProjet - ID of the projet to retrieve
     * @param {Object} res - Express response object
     */
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

        /**
     * Get projets by member ID
     * Requête GET avec un paramètre 'idMembre' pour récupérer les projets associés à un membre spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.pseudo - pseudops of the member
     * @param {Object} res - Express response object
     */
    async getProjetByMembre(req, res) {
        try{
            const projets = await Projet.findAll({
                include: [{
                    model: db.membresProjets,
                    where: {id_membre: req.membre.pseudo}
                }]
            });
            return res.status(200).json(projets);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

        /**
     * Create a new projet
     * Requête POST avec un corps de requête contenant les informations du projet
     * 
     * Request Body:
     * {
     *   "nom": "string",
     *   "description": "string",
     *   "date_debut": "date",
     *   "date_fin": "date",
     *   "pseudo_createur": "string"
     * }
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.body - Request body
     * @param {string} req.body.nom - Name of the project
     * @param {string} req.body.description - Description of the project
     * @param {date} req.body.date_debut - Start date of the project
     * @param {date} req.body.date_fin - End date of the project
     * @param {string} req.body.pseudo_createur - Creator's pseudo
     * @param {Object} res - Express response object
     */
    async createProjet(req, res) {
        try{
            const projet = await Projet.create(req.body);
            return res.status(201).json(projet);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },


    
    /**
     * Update a projet by ID
     * Requête PUT avec un paramètre 'idProjet' et un corps de requête contenant les informations à mettre à jour
     * 
     * Request Body:
     * {
     *   "nom": "string",
     *   "description": "string",
     *   "date_debut": "date",
     *   "date_fin": "date"
     * }
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idProjet - ID of the projet to update
     * @param {Object} req.body - Request body
     * @param {string} req.body.nom - Name of the project
     * @param {string} req.body.description - Description of the project
     * @param {date} req.body.date_debut - Start date of the project
     * @param {date} req.body.date_fin - End date of the project
     * @param {Object} res - Express response object
     */
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

        /**
     * Delete a projet by ID
     * Requête DELETE avec un paramètre 'idProjet' pour supprimer un projet spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idProjet - ID of the projet to delete
     * @param {Object} res - Express response object
     */
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