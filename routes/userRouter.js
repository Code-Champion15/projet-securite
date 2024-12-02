const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Routes utilisateur
router.post('/signup', userController.SignUp);
router.post('/signin', userController.SignIn);
router.get('/protected', userController.endpoint);

module.exports = router;
