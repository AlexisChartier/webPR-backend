// membersRoutes.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const membresController = require('../controllers/membresController');
const { validationErrorMessage } = require('../utils');

const router = express.Router();

// Validation rules for creating a member
const createMemberValidationRules = [
  body('nom').not().isEmpty().withMessage('Le nom est requis'),
  body('prenom').not().isEmpty().withMessage('Le prénom est requis'),
  body('email').isEmail().withMessage('L\'email doit être valide'),
  body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
];

// Create a new member
router.post('/', createMemberValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(validationErrorMessage(errors.array()));
  }
  membresController.CreateUser(req, res);
});

// Retrieve all members
router.get('/', membresController.getAllMembres);

// Retrieve a member by pseudo
router.get('/:pseudo', membresController.getMembreByPseudo);

// Check if a member exists
router.get('/check/:pseudo', membresController.checkIfMembreExists);

// Login
router.post('/login', membresController.login);

// Update a member
router.put('/:pseudo', membresController.updateMembre);

// Delete a member
router.delete('/:pseudo', membresController.deleteMembre);

// Retrieve members associated with a project
router.get('/projets/:id_projet', membresController.getMembresProjet);

// Retrieve members associated with a task
router.get('/taches/:id_tache', membresController.getMembresTache);

// Retrieve points associated with a member
router.get('/:pseudo/points', membresController.getPointsByMembre);

module.exports = router;
