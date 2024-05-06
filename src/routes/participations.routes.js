// participationsRoutes.js

const express = require('express');
const participationsController = require('../controllers/participationsController');

const router = express.Router();

// Retrieve all participations
router.get('/', participationsController.getParticipations);

// Retrieve participations by pseudo
router.get('/pseudo/:pseudo', participationsController.getParticipationByPseudo);

// Retrieve participations by date de réunion
router.get('/date-reu/:date_reu', participationsController.getParticipationByDateReu);

module.exports = router;
