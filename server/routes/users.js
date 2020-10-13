const express = require('express');
const { getAllUsers, loginUser, registerUser } = require('../controllers/users-route');
const router = express.Router();

// login and register post routes endpoints
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;