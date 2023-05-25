const express = require('express');
const expressRouter = express.Router();
const authController = require('../controllers/auth-controller');

expressRouter.post('/register', authController.registerAccount);
expressRouter.post('/login', authController.loginAccount);
expressRouter.get('/:id', authController.getUserData);
expressRouter.patch('/:id', authController.updateUserData);
expressRouter.delete('/:id', authController.deleteUser);

module.exports = expressRouter;
