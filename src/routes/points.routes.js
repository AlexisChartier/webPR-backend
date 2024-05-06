// pointsRoutes.js

const express = require('express');
const pointsController = require('../controllers/pointsController');

const router = express.Router();

// Retrieve all points
router.get('/', pointsController.getPoints);

// Retrieve points by pseudo
router.get('/pseudo/:pseudo', pointsController.getPointByPseudo);

// Retrieve points by date
router.get('/date/:date', pointsController.getPointByDate);

// Retrieve points by tache
router.get('/tache/:id_tache', pointsController.getPointsByTache);

module.exports = router;
