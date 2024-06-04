/**
 * Roles Controller
 * 
 * This controller handles CRUD operations for roles.
 * 
 * Methods:
 * - getAllRoles: Retrieves all roles.
 * - getRole: Retrieves a role by ID.
 * - createRole: Creates a new role.
 * - updateRole: Updates a role by ID.
 * - deleteRole: Deletes a role by ID.
 */
const db = require('../models');
const Role = db.roles;
const utils = require('../utils');

const rolesController = {
        /**
     * Get all roles
     * Requête GET pour récupérer tous les rôles
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async getAllRoles(req, res) {
        try{
            let roles = await Role.findAll();
            return res.status(200).json(roles);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

        /**
     * Get role by ID
     * Requête GET avec un paramètre 'idRole' pour récupérer un rôle spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idRole - ID of the role to retrieve
     * @param {Object} res - Express response object
     */
    async getRole(req, res) {
        try{
            const role = await Role.findByPk(req.params.idRole);
            if(role){
                return res.status(200).json(role);
            } else {
                return res.status(404).json({error: "Role non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

        /**
     * Create a new role
     * Requête POST avec un corps de requête contenant les informations du rôle
     * 
     * Request Body:
     * {
     *   "nom": "string"
     * }
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.body - Request body
     * @param {string} req.body.nom - Name of the role
     * @param {Object} res - Express response object
     */
    async createRole(req, res) {
        try{
            const role = await Role.create(req.body);
            return res.status(201).json(role);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

        /**
     * Delete a role by ID
     * Requête DELETE avec un paramètre 'idRole' pour supprimer un rôle spécifique
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idRole - ID of the role to delete
     * @param {Object} res - Express response object
     */
    async deleteRole(req, res) {
        try{
            const role = await Role.findByPk(req.params.idRole);
            if(role){
                await Role.destroy({where: {idRole: req.params.idRole}});
                return res.status(200).json({message: "Role supprimé"});
            } else {
                return res.status(404).json({error: "Role non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

        /**
     * Update a role by ID
     * Requête PUT avec un paramètre 'idRole' et un corps de requête contenant les informations à mettre à jour
     * 
     * Request Body:
     * {
     *   "nom": "string"
     * }
     * 
     * @param {Object} req - Express request object
     * @param {Object} req.params - Request parameters
     * @param {number} req.params.idRole - ID of the role to update
     * @param {Object} req.body - Request body
     * @param {string} req.body.nom - Name of the role
     * @param {Object} res - Express response object
     */
    async updateRole(req, res) {
        try{
            const role = await Role.findByPk(req.params.idRole);
            if(role){
                await Role.update(req.body, {where: {idRole: req.params.idRole}});
                return res.status(200).json({message: "Role modifié"});
            } else {
                return res.status(404).json({error: "Role non trouvé"});
            }
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    }

}

module.exports = rolesController;