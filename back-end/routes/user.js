const express = require ('express');
const router = express.Router();
// Avant usercontrol signup, email validator et regex sur email en clair.
const email = require ('../middleware/email');
// Avant usercontrol signup, password validator sur mdp en clair.
const password = require ('../middleware/password');
const userControl = require ('../controllers/user');

// Déclaration des routes signup et login.
router.post ('/signup', email, password, userControl.signup);
router.post ('/login', userControl.login);

module.exports = router;

