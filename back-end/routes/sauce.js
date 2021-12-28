const express = require ('express');
const router = express.Router();

// Elements requis pour la sécurité et la modification/importation des éléments liés aux sauces.
const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-config.js');
const sauceControl = require ('../controllers/sauce');

// Routes pour la gestion CRUD de la sauce.
router.post ('/', auth, multer, sauceControl.createSauce);
router.get ('/:id', auth, sauceControl.getOneSauce);
router.get ('/', auth, sauceControl.getAllSauce);
router.put ('/:id', auth, multer, sauceControl.modifySauce);
router.delete ('/:id', auth, multer, sauceControl.deleteSauce);
router.post ('/:id/like', auth, sauceControl.likeSauce);

module.exports = router;