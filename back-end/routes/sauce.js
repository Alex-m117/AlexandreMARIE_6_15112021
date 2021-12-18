const express = require ('express');
const router = express.Router();

const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-config.js');

const sauceControl = require ('../controllers/sauce');

router.post ('/', auth, multer, sauceControl.createSauce);
router.get ('/:id', auth, sauceControl.getOneSauce);
router.get ('/', auth, sauceControl.getAllSauce);
router.put ('/:id', auth, multer, sauceControl.modifySauce);
router.delete ('/:id', auth, multer, sauceControl.deleteSauce);
router.post ('/:id/like', auth, sauceControl.likeSauce);

module.exports = router;