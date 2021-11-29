const express = require('express');
const router = express.Router();


const sauceCrtl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config.js');

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauces);
router.post('/:id/like', auth, multer, sauceCtrl.likeSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;