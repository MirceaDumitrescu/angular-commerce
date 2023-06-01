const expressAuth = require('express');
const expressAuthRouter = expressAuth.Router();
const authController = require('../controllers/auth-controller');

expressAuthRouter.post('/register', authController.registerAccount);
expressAuthRouter.post('/login', authController.loginAccount);
expressAuthRouter.get('/:id', authController.getUserData);
expressAuthRouter.patch('/:id', authController.updateUserData);
expressAuthRouter.delete('/:id', authController.deleteUser);

module.exports = expressAuthRouter;
