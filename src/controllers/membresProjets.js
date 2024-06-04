/**
 * MembresProjets Controller
 * 
 * This controller handles CRUD operations for membresProjets.
 * 
 * Methods:
 * - getMembresProjets: Retrieves all membresProjets.
 * - getMembreProjet: Retrieves a membreProjet by ID.
 * - getMembresByProjet: Retrieves membresProjets by project ID.
 * - getProjetsByMembre: Retrieves membresProjets by member ID.
 * - createMembreProjet: Creates a new membreProjet.
 * - updateMembreProjet: Updates a membreProjet by ID.
 * - deleteMembreProjet: Deletes a membreProjet by ID.
 */

const db = require('../models')
const membresProjets = db.membresProjets
const projets = db.projets
const membres = db.membres

const membresProjetsController = {

    /**
     * Get all membresProjets
     * Requête GET pour récupérer tous les membresProjets
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async getMembresProjets(req, res) {
        try{
            let membresProjets = await membresProjets.findAll();
            return res.status(200).json(membresProjets);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    /**
     * Get membreProjet by ID
     * Requête GET avec un paramètre 'idMembreProjet' pour récupérer un membreProjet spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idMembreProjet - ID of the membreProjet to retrieve
     * @param {Object} res - Express response object
     */
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

    /**
     * Get membres by project ID
     * Requête GET avec un paramètre 'idProjet' pour récupérer les membresProjets associés à un projet spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idProjet - ID of the project
     * @param {Object} res - Express response object
     */
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

    /**
     * Get projects by member ID
     * Requête GET avec un paramètre 'idMembre' pour récupérer les membresProjets associés à un membre spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idMembre - ID of the member
     * @param {Object} res - Express response object
     */
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

  /**
     * Create a new membreProjet
     * Requête POST avec un corps de requête contenant les informations du membreProjet
     * 
     * Request Body:
     * {
     *   "id_membre": "number",
     *   "id_projet": "number"
     * }
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.body
     * @param {Object} req.body - Request body
     * @param {number} req.body.id_membre - ID of the member
     * @param {number} req.body.id_projet - ID of the project
     * @param {Object} res - Express response object
     */
    async createMembreProjet(req, res) {
        try{
            const membreProjet = await membresProjets.create(req.body);
            return res.status(201).json(membreProjet);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    /**
     * Update a membreProjet by ID
     * Requête PUT avec un paramètre 'idMembreProjet' et un corps de requête contenant les informations à mettre à jour
     * 
     * Request Body:
     * {
     *   "id_membre": "number",
     *   "id_projet": "number"
     * }
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idMembreProjet - ID of the membreProjet to update
     * @param {Object} req.body - Request body
     * @param {number} req.body.id_membre - ID of the member
     * @param {number} req.body.id_projet - ID of the project
     * @param {Object} res - Express response object
     */
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

    /**
     * Delete a membreProjet by ID
     * Requête DELETE avec un paramètre 'idMembreProjet' pour supprimer un membreProjet spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idMembreProjet - ID of the membreProjet to delete
     * @param {Object} res - Express response object
     */
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

module.exports = membresProjetsController;


