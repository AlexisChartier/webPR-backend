// tachesRoutes.js

const express = require('express');
const tachesController = require('../controllers/tachesController');

const router = express.Router();

// Validation rules for creating a tâche
const createTacheValidationRules = [
    body('nom').not().isEmpty().withMessage('Le nom est requis'),
    body('description').not().isEmpty().withMessage('La description est requise'),
    body('date_debut').not().isEmpty().withMessage('La date de début est requise').isDate().withMessage('La date de début doit être au format date'),
    body('date_fin').not().isEmpty().withMessage('La date de fin est requise').isDate().withMessage('La date de fin doit être au format date'),
    body('id_projet').not().isEmpty().withMessage("L'ID du projet est requis"),
  ];


// Create a new tâche
router.post('/',createTacheValidationRules, tachesController.createTache);

// Update a tâche
router.put('/:idTache', tachesController.updateTache);

// Delete a tâche
router.delete('/:idTache', tachesController.deleteTache);

// Retrieve tâches by membre
router.get('/membre/:idMembre', tachesController.getTachesByMembre);

// Retrieve all tâches
router.get('/', tachesController.getAllTaches);

module.exports = router;
