// projetsRoutes.js

const express = require('express');
const projetsController = require('../controllers/projetsController');

const router = express.Router();

// Validation rules for creating a projet
const createProjetValidationRules = [
    body('nom').not().isEmpty().withMessage('Le nom est requis'),
    body('description').not().isEmpty().withMessage('La description est requise'),
    body('date_debut').not().isEmpty().withMessage('La date de début est requise').isDate().withMessage('La date de début doit être au format date'),
    body('date_fin').not().isEmpty().withMessage('La date de fin est requise').isDate().withMessage('La date de fin doit être au format date'),
  ];
  
  // Validation rules for updating a projet
  const updateProjetValidationRules = [
    body('nom').not().isEmpty().withMessage('Le nom est requis'),
    body('description').not().isEmpty().withMessage('La description est requise'),
    body('date_debut').optional().isDate().withMessage('La date de début doit être au format date'),
    body('date_fin').optional().isDate().withMessage('La date de fin doit être au format date'),
  ];

// Retrieve all projets
router.get('/', projetsController.getAllProjets);

// Retrieve projet by ID
router.get('/:idProjet', projetsController.getProjet);

// Retrieve projets by membre
router.get('/membre/:idMembre', projetsController.getProjetByMembre);

// Create a new projet
router.post('/', createProjetValidationRules,projetsController.createProjet);

// Update a projet
router.put('/:idProjet', updateProjetValidationRules ,projetsController.updateProjet);

// Delete a projet
router.delete('/:idProjet', projetsController.deleteProjet);

module.exports = router;
