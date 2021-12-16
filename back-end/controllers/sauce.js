console.log(` ----> test`);

const Sauce = require('../models/Sauce');
const fs = require('fs');

// Création de la sauce
exports.createSauce = (req, res, next) => {
 

  console.log(`----->CONTENU : req.body - controllers/sauce`);
  const obj = JSON.parse(JSON.stringify(req.body));

  console.log(obj); 

  const sauceObject = JSON.parse(req.body.sauce);
  // Suppression de l'id de la sauce car Mongo DB en génére déjà un utilisable.
  delete sauceObject._id;
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
  .catch((error) => { res.status(400).json({ error });
  })  
};

exports.getOneSauce = (req, res, next) => {
  Sauce
  .findOne({ _id : req.params.id })
  .then((sauce) => { res.status(200).json(sauce);
  })
  .catch((error) => { res.status(404).json({ error });
  });
};

exports.getAllSauce = (req, res, next) => {
  Sauce
  .find().then((sauces) => { res.status(200).json(sauces);
  })
  .catch((error) => { res.status(400).json({ error });
  });
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  // Update de la sauce via sont id et modifie de corps du body de l'id selectionné.
  Sauce
    .updateOne({_id : req.params.id}, {...sauceObject, _id : req.params.id})
    .then(() => { res.status(201).json({ message: 'Modification(s) de la sauce enregistrée !' });
    })
    .catch((error) => { res.status(400).json({ error: error });
    })
};

exports.deleteSauce = (req, res, next) => {   
  Sauce
    .findOne({ _id : req.params.id })
    .then(sauce => {   
    console.log(`-->user id sauce`) 
    console.log(sauce.userId)
    console.log(`-->user id du token`) 
    console.log(req.token.userId)
      if (!sauce) {
        return res.status(401).json ({ error: 'Sauce non trouvée !' });
        }
      if (sauce.userId === req.token.userId) { 
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => { 
          Sauce
            .deleteOne({ _id : req.params.id })
            .then(() => { res.status(200).json({ message: 'Sauce supprimée !' });
            })
            .catch((error) => { res.status(404).json({ error });
            })
        }
      )}
      else {
        res.status(403).json({ error: ('Requête non autorisée !')
        });
      }
    })
    .catch((error) => { res.status(500).json({ error });
    });
};

exports.likeSauce = (req, res, next) => { 
// Déclaration des constantes pour implémenter le système de vote "$pull / $inc / $push" de MongoDB"
const sauceId = req.params.id;
const userId = req.body.userId;
const userLike = req.body.like;


  if (userLike === 0) {
    Sauce
      .findOne({ _id : sauceId })
      .then((sauce) => {
      // Import des tableaux du schema sauce pour requeillir le nombre de Likes total
      const usersLiked = sauce.userLiked;
      const usersDisliked = sauce.usersDisliked;
      console.log(usersLiked)
      console.log(usersDisliked)
      
      // Contrôle en effectuant une recherche de l'userId si l'user à déjà effectué un vote.
      const userLiked = usersLiked.find((id) => id === userId);
      const userDisliked = userDisliked.find((id) => id === userId);
      console.log(userLiked)
      console.log(userDisliked)
    // Si l'utilisateur à déjà "like" la sauce, le like est retiré ainsi que sont id dans le tableau "usersLiked".
    if( userLiked ) {
      Sauce
      .updateOne({ _id : sauceId },
      {
       $inc: { likes: -1 },
       $pull: { usersLiked: userId }
      }
      )
      .then(() => { res.status(201).json({ message: "Vote enregisté !" });
      })
      .catch(error => { res.status(400).json({ error });
      });
    }
    // Si l'utilisateur à déjà "dislike" la sauce, le dislike est retiré ainsi que sont id dans le tableau "usersDisliked"
    if( userDisliked ) {
      Sauce
      .updateOne({ _id : sauceId },
      {
        $inc: { dislikes: -1 },
        $pull: { usersDisliked: userId }
      }
      )
      .then(() => { res.status(201).json({ message: "Vote enregisté !" });
      })
      .catch(error => { res.status(400).json({ error });
      })
    } 
  })
  .catch((error) => {res.status(404).json({ error });
  });  
  };
  // Si l'utilisateur n'à pas encore "like" la sauce, le like est ajouter ainsi que sont id dans le tableau "usersLiked".
  if ( userLike === 1 ) {
    Sauce
      .updateOne({ _id : sauceId },
      {
        $inc: { likes: 1 },
        $push: { usersLiked: userId }
      })
      .then(() => { res.status(201).json({ message: "Vote enregisté !" });
      }
      )
      .catch(error => { res.status(400).json({ error });
      });
  };
  // Si l'utilisateur n'à pas encore "dislike" la sauce, le dislike est ajouter ainsi que sont id dans le tableau "usersDisliked"
  if ( userLike === -1 ) {
    Sauce
      .updateOne({ _id : sauceId },
      {
        $inc: { dislikes: 1 },
        $push: { usersDisliked: userId }
      }
      )
      .then(() => { res.status(201).json({ message: "Vote enregisté !" });
      })
      .catch(error => { res.status(400).json({ error });
      });
  }
};
