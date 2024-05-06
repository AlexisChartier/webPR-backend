const db = require('../models');
const Role = db.roles;
const utils = require('../utils');

const rolesController = {
    async getAllRoles(req, res) {
        try{
            let roles = await Role.findAll();
            return res.status(200).json(roles);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

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

    async createRole(req, res) {
        try{
            const role = await Role.create(req.body);
            return res.status(201).json(role);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    },

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