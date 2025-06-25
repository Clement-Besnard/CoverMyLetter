const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

// CRUD basique
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/:id/purchase', userController.purchaseCredits);

// Route d'authentification
router.post('/auth/login', userController.loginUser);

module.exports = router;
