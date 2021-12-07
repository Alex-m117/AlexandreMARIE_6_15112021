const express = require ('express');
const router = express.Router();

// Avant usercontrol signup, password validator sur mdp en clair
const password = require ('../middleware/password');
const userControl = require ('../controllers/user');


router.post ('/signup', password, userControl.signup);
router.post ('/login', userControl.login);

module.exports = router;

