const express = require('express');
const router = express.Router();
const agentsController = require('../controllers/agents.controller');

// Route pour générer une lettre de motivation
router.post('/generate', agentsController.uploadMiddleware, agentsController.generateCoverLetter);
router.post('/modify-letter', agentsController.modifyLetter);

module.exports = router;