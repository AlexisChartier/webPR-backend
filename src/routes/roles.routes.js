// rolesRoutes.js

const express = require('express');
const rolesController = require('../controllers/rolesController');

const router = express.Router();

// Retrieve all roles
router.get('/', rolesController.getAllRoles);

// Retrieve role by ID
router.get('/:idRole', rolesController.getRole);

// Create a new role
router.post('/', rolesController.createRole);

// Update a role
router.put('/:idRole', rolesController.updateRole);

// Delete a role
router.delete('/:idRole', rolesController.deleteRole);

module.exports = router;
