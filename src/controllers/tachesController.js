/**
 * Taches Controller
 * 
 * This controller handles CRUD operations for taches.
 * 
 * Methods:
 * - createTache: Creates a new tache.
 * - updateTache: Updates a tache by ID.
 * - deleteTache: Deletes a tache by ID.
 * - getTachesByMembre: Retrieves taches by member ID.
 * - getAllTaches: Retrieves all taches.
 */
const db = require('../models');
const utils = require('../utils');

const Tache = db.taches;


const tachesController = {
    /**
     * Create a new tache
     * Requête POST avec un corps de requête contenant les informations de la tâche
     * 
     * Request Body:
     * {
     *   "nom": "string",
     *   "description": "string",
     *   "date_debut": "date",
     *   "date_fin": "date",
     *   "id_projet": "number"
     * }
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.body - Request body
     * @param {string} req.body.nom - Name of the task
     * @param {string} req.body.description - Description of the task
     * @param {date} req.body.date_debut - Start date of the task
     * @param {date} req.body.date_fin - End date of the task
     * @param {number} req.body.id_projet - ID of the project
     * @param {Object} res - Express response object
     */
    async createTache(req, res) {
        try{
            const tache = await Tache.create(req.body);
            return res.status(201).json(tache);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    
    /**
     * Update a tache by ID
     * Requête PUT avec un paramètre 'idTache' et un corps de requête contenant les informations à mettre à jour
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
     * @param {number} req.params.idTache - ID of the tache to update
     * @param {Object} req.body - Request body
     * @param {string} req.body.nom - Name of the task
     * @param {string} req.body.description - Description of the task
     * @param {date} req.body.date_debut - Start date of the task
     * @param {date} req.body.date_fin - End date of the task
     * @param {Object} res - Express response object
     */
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

        /**
     * Delete a tache by ID
     * Requête DELETE avec un paramètre 'idTache' pour supprimer une tâche spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idTache - ID of the tache to delete
     * @param {Object} res - Express response object
     */
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

        /**
     * Get taches by member ID
     * Requête GET avec un paramètre 'idMembre' pour récupérer les tâches associées à un membre spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idMembre - ID of the member
     * @param {Object} res - Express response object
     */
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

        /**
     * Get all taches
     * Requête GET pour récupérer toutes les tâches
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
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