/**
 * Points Controller
 * 
 * This controller handles CRUD operations for points.
 * 
 * Methods:
 * - getPoints: Retrieves all points.
 * - getPointByPseudo: Retrieves points by pseudo.
 * - getPointByDate: Retrieves points by date.
 * - getPointsByTache: Retrieves points by task ID.
 */
const db = require('../models')
const points = db.points

const pointsController = {
    
        /**
     * Get all points
     * Requête GET pour récupérer tous les points
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
        async getPoints(req, res) {
            try{
                let points = await points.findAll();
                return res.status(200).json(points);
            } catch(error){
                return res.status(400).json({error: error.message});
            }
        },
    
            /**
     * Get points by pseudo
     * Requête GET avec un paramètre 'pseudo' pour récupérer les points associés à un pseudo spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {string} req.params.pseudo - Pseudo of the member
     * @param {Object} res - Express response object
     */
        async getPointByPseudo(req, res) {
            try{
                const point = await points.findAll({
                    where: {pseudo: req.params.pseudo}
                });
                return res.status(200).json(point);
            } catch(error){
                return res.status(400).json({error: error.message});
            }
        },
    
            /**
     * Get points by date
     * Requête GET avec un paramètre 'date' pour récupérer les points associés à une date spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {string} req.params.date - Date of the points
     * @param {Object} res - Express response object
     */
        async getPointByDate(req, res) {
            try{
                const point = await points.findAll({
                    where: {date: req.params.date}
                });
                return res.status(200).json(point);
            } catch(error){
                return res.status(400).json({error: error.message});
            }
        },

            /**
     * Get points by task ID
     * Requête GET avec un paramètre 'id_tache' pour récupérer les points associés à une tâche spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.id_tache - ID of the task
     * @param {Object} res - Express response object
     */
        async getPointsByTache(req, res) {
            try{
                const point = await points.findAll({
                    where: {id_tache: req.params.id_tache}
                });
                return res.status(200).json(point);
            } catch(error){
                return res.status(400).json({error: error.message});
            }
        }
    }

    module.exports = pointsController;