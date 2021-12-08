// Importation de Multer.
const multer = require('multer');

// Blibliothèque de MIMES TYPES.
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

// Destination du fichier et création d'un fichier unique.
const storage = multer.diskStorage({
  // Destination du stockage du fichier.
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // Suppression des espaces dans le nom du fichier.
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    
    callback(null, name + Date.now() + '.' + extension);
  }
});
console.log("------>contenu: STORAGE")
console.log(storage)
module.exports = multer({ storage }).single('image');