const express = require ('express');
const router = express.Router();

const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-config.js');

const sauceControl = require ('../controllers/sauce');

//router.get ('/', auth, sauceControl.getAllSauce);
router.post ('/', auth, multer, sauceControl.createSauce);
//router.get ('/:id', auth, sauceControl.getOneSauce);
//router.put ('/:id', auth, multer, sauceControl.modifySauce);
//router.delete ('/:id', auth, sauceControl.deleteSauce);
//router.post ('/:id/like', auth, multer, sauceControl.likeSauce);

module.exports = router;