console.log(` ----> test`);

const Sauce = require('../models/Sauce');
const fs = require('fs');

// Création de la sauce
exports.createSauce = (req, res, next) => {
  //delete sauceObject._id;
  console.log(`----->CONTENU : req.body - controllers/sauce`);
  const obj = JSON.parse(JSON.stringify(req.body));

  console.log(obj); 

  const sauceObject = JSON.parse(req.body.sauce);
  console.log(`CONTENU : req.body.sauce - controllers/sauce`);
  console.log(sauceObject)
  const sauce = new Sauce({
    // Spread des infos schema.
    ...sauceObject,

    // Récupération de l'image.
    imageUrl: `${req.protocol}://${req.get('host')}/images/${ req.file.filename }`,

    // Initialisation des valeurs de like/dislike.
    likes: 0,
    dislikes: 0,
    usersLiked: [' '],
    usersDisliked: [' '],
  })
  console.log(`CONTENU : sauce - controllers/sauce`);
  console.log(sauce)
  
  sauce.save()
  .then(() => { res.status(201).json({ message: 'Sauce crée et enregistrée !', contenu: req.body });
})
  .catch((error) => { res.status(400).json({ error: error });
})  
};

exports.getOneSauce = (req, res, next) => {
  Sauce
  .findOne({ _id: req.params.id })
  .then((sauce) => { res.status(200).json(sauce);
  })
  .catch((error) => { res.status(404).json({ error: error });
}
);
};

exports.getAllSauce = (req, res, next) => {
  Sauce
  .find().then((sauces) => { res.status(200).json(sauces);
  })
  .catch((error) => { res.status(400).json({ error: error });
}
);
};








