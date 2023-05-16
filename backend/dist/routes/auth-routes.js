"use strict";
const express = require('express');
const expressRouter = express.Router();
const authController = require('../controllers/auth-controller');
expressRouter.post('/register', authController.registerAccount);
module.exports = expressRouter;
