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
// Récupére via GET la sauce via sont ID en format JSON.
exports.getOneSauce = (req, res, next) => {
  Sauce
  .findOne({ _id : req.params.id })
  .then((sauce) => { res.status(200).json(sauce);
  })
  .catch((error) => { res.status(404).json({ error });
});
};
// Récupére via GET toutes les sauces en JSON.
exports.getAllSauce = (req, res, next) => {
  Sauce
  .find().then((sauces) => { res.status(200).json(sauces);
  })
  .catch((error) => { res.status(400).json({ error });
});
};
// Modifie via la méthode PUT la sauce via sont ID (champs et image via multer)
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

// Suppression de la sauce créer par l'utilisateur.
exports.deleteSauce = (req, res, next) => {   
  Sauce
  .findOne({ _id : req.params.id })
  .then((sauce => {   
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
    ))
  .catch((error) => { res.status(500).json({ error });
});
};

// Via la méthode POST donne la possibilité aux utilisateurs d'aimer ou de ne pas aimer une sauce crée.
exports.likeSauce = (req, res, next) => { 
  // Déclaration des constantes pour implémenter le système de vote "$pull / $inc / $push" de MongoDB" dans la méthode switch/case.
  const like = req.body.like;
  const sauceId = req.params.id;
  const userId = req.body.userId;
  
  Sauce
  .findOne({ _id : sauceId })
  .then((sauce) => {
    
    // Recherche via la méthode .find() l'id des users qui ont like ou dislike pour connaitre l'état actuel du vote utilisateur.
    const likeUser = sauce.usersLiked.find(id => id === userId);
    const dislikeUser = sauce.usersDisliked.find(id => id === userId);
  
    switch (like) {

      // Valeur 1 : Si l'utilisateur n'a jamais like, au clic, appliquera l'ajout dans le tableau "usersLiked" et le pouce vert "Likes".
      case 1:
          // Si l'id de l'utilisateur n'est pas dans le tableau "usersLiked",
          if (!likeUser ){
            Sauce
            .updateOne({ _id : sauceId },
            {
            // Incrémente la valeur pour +1 pour "likes".
            $inc: { likes: +1 },
            // Ajoute le userId dans le tableau "usersLiked".
            $push: { usersLiked: userId }
            })
            .then(() => { res.status(201).json({ message: " Aime la sauce ! " });
            })
            .catch(error => { res.status(400).json({ error });
            })
          };
      break;
      
      // Valeur 0 : Si l'utilisateur à déja like/dislike ont retire alors le vote et l'id du tableau correspondant à sont précédent vote.
      case 0:
      // Si l'userId est dans le tableau usersLiked retiré le like et le userId du tableau UsersLiked.
          if (likeUser) {
            Sauce
            .updateOne({ _id : sauceId },
            {
            // Incrémente la valeur -1 pour "likes".
            $inc: { likes: -1 },
            // Supprime le userId du tableau "usersLiked".
            $pull: { usersLiked: userId }
            })
            .then(() => { res.status(201).json({ message: " Retrait du like! " });
            })
            .catch(error => { res.status(400).json({ error });
            })
          }
          else {
          if (dislikeUser) {
            Sauce
            .updateOne({ _id : sauceId },
            {
            // Incrémente la valeur pour -1 pour "dislikes".
            $inc: { dislikes: -1 },
            // Supprime le userId du tableau "usersDisliked".
            $pull: { usersDisliked: userId }
            })
            .then(() => { res.status(201).json({ message: " Retrait du dislike ! " });
            })
            .catch(error => { res.status(400).json({ error });
            })
          };
          };
      break;

      // Valeur -1 : Si l'utilisateur n'a jamais dislike, au clic, appliquera l'ajout dans le tableau "usersDisliked" et le pouce rouge "Dislikes".
      case -1:
          // Si l'id de l'utilisateur n'est pas dans le tableau "usersDisliked".
          if(!dislikeUser) {
            Sauce
            .updateOne({ _id : sauceId },
            {
            // Incrémente la valeur pour +1 pour "dislikes".
            $inc: { dislikes: +1 },
            // Ajoute le userId dans le tableau "usersDisliked".
            $push: { usersDisliked: userId },
            })
            .then(() => { res.status(201).json({ message: " N'aime pas la sauce ! " });
            })
            .catch(error => { res.status(400).json({ error });
            })
          };
          
          sauce.save()
          .then(() => { res.status(201).json({ message: " Modification(s) enregistrée(s) ! " });
          })
          .catch(error => { res.status(400).json({ error });
          })
    };
  })
          .catch((error) => {res.status(500).json({ error }); 
          });
    };

       
