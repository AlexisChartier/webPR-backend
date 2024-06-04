/**
 * MembresTaches Controller
 * 
 * This controller handles CRUD operations for membresTaches.
 * 
 * Methods:
 * - getMembresTaches: Retrieves all membresTaches.
 * - getMembreTache: Retrieves a membreTache by ID.
 * - getMembresByTache: Retrieves membresTaches by task ID.
 * - getTachesByMembre: Retrieves membresTaches by member ID.
 * - createMembreTache: Creates a new membreTache.
 * - updateMembreTache: Updates a membreTache by ID.
 * - deleteMembreTache: Deletes a membreTache by ID.
 */
const db = require('../models')
const membresTaches = db.membresTaches
const taches = db.taches
const membres = db.membres

const membresTachesController = {

    /**
     * Get all membresTaches
     * Requête GET pour récupérer tous les membresTaches
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async getMembresTaches(req, res) {
        try{
            let membresTaches = await membresTaches.findAll();
            return res.status(200).json(membresTaches);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    /**
     * Get membreTache by ID
     * Requête GET avec un paramètre 'idMembreTache' pour récupérer un membreTache spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idMembreTache - ID of the membreTache to retrieve
     * @param {Object} res - Express response object
     */
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

    /**
     * Get membres by task ID
     * Requête GET avec un paramètre 'idTache' pour récupérer les membresTaches associés à une tâche spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idTache - ID of the task
     * @param {Object} res - Express response object
     */
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

    /**
     * Get tasks by member ID
     * Requête GET avec un paramètre 'idMembre' pour récupérer les membresTaches associés à un membre spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idMembre - ID of the member
     * @param {Object} res - Express response object
     */
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

    /**
     * Create a new membreTache
     * Requête POST avec un corps de requête contenant les informations du membreTache
     * 
     * Request Body:
     * {
     *   "id_membre": "number",
     *   "id_tache": "number"
    *   "id_tache": "number"
    * }
    * 
    * @param {Object} req - Express request object
    * @param {Object} req.body - Request body
    * @param {number} req.body.id_membre - ID of the member
    * @param {number} req.body.id_tache - ID of the task
    * @param {Object} res - Express response object
    */
    async createMembreTache(req, res) {
        try{
            const membreTache = await membresTaches.create(req.body);
            return res.status(201).json(membreTache);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    /**
     * Update a membreTache by ID
     * Requête PUT avec un paramètre 'idMembreTache' et un corps de requête contenant les informations à mettre à jour
     * 
     * Request Body:
     * {
     *   "id_membre": "number",
     *   "id_tache": "number"
     * }
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idMembreTache - ID of the membreTache to update
     * @param {Object} req.body - Request body
     * @param {number} req.body.id_membre - ID of the member
     * @param {number} req.body.id_tache - ID of the task
     * @param {Object} res - Express response object
     */
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

    /**
     * Delete a membreTache by ID
     * Requête DELETE avec un paramètre 'idMembreTache' pour supprimer un membreTache spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idMembreTache - ID of the membreTache to delete
     * @param {Object} res - Express response object
     */
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

module.exports = membresTachesController;

