console.log(` ----> test`);


const Sauce = require('../models/Sauce');

// Création de la sauce
exports.createSauce = (req, res, next) => {

  console.log(`----->CONTENU : req.body.email - controllers/sauce`);
  console.log(req.body)


 const bodySauce = JSON.parse(req.body.Sauce);
  console.log(`CONTENU : req.body.password - controllers/sauce`);
  console.log(bodySauce)
  const sauce = new Sauce({
    // Spread des infos schema.
    ...bodySauce,

    //userId: bodySauce.userId,
    //name: bodySauce.name,
    //manufacturer: bodySauce.manufacturer,
    //description: bodySauce.description,
    //mainPepper: bodySauce.mainPepper,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${ req.file.filename }`,
    //heat: bodySauce.heat,
    //likes: 0,
    //dislikes: 0,
    //usersLiked: [' '],
   // usersDisliked: [' '],
  })
  console.log(`CONTENU : sauce - controllers/sauce`);
console.log(sauce)
  if (sauce.userId === req.token.userId) {
    sauce.save().then(() => {
      res.status(201).json({ message: 'Post saved successfully!', contenu: req.body });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    }  
  )}

  else {
        res.status(403).json({ error: "403 a decrire" });
  }
};

