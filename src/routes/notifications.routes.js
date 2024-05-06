// notificationsRoutes.js

const express = require('express');
const notificationsController = require('../controllers/notificationsController');

const router = express.Router();

// Retrieve all notifications
router.get('/', notificationsController.getNotifications);

// Retrieve notifications by pseudo emetteur
router.get('/emetteur/:pseudo_emetteur', notificationsController.getNotificationByPseudoEmetteur);

// Retrieve notifications by pseudo destinataire
router.get('/destinataire/:pseudo_destinataire', notificationsController.getNotificationByPseudoDestinataire);

module.exports = router;
