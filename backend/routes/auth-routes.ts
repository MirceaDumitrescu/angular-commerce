const express = require('express');
const expressRouter = express.Router();
const authController = require('../controllers/auth-controller');

expressRouter.post('/register', authController.registerAccount);
expressRouter.post('/login', authController.loginAccount);
expressRouter.get('/profile/:id', authController.getUserData);
expressRouter.patch('/profile/:id', authController.updateUserData);
expressRouter.delete('/profile/:id', authController.deleteUser);

module.exports = expressRouter;
