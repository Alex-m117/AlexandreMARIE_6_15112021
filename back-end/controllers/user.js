// Déclaration des modules d'authentification sécurisés (token et hash).
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');
const cryptojs = require('crypto-js');
console.log(cryptojs)

// Importation models de la base de données "User.js".
const User = require ("../models/User");


exports.signup = (req, res, next) => {

  console.log("CONTENU : req.body.email - controllers/user");
  console.log(req.body.email)
  console.log("CONTENU : req.body.password - controllers/user");
  console.log(req.body.password)

  const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, "CLE_SECRETE").toString();
  console.log("CONTENU : emailCryptoJs - controllers/user")

  bcrypt.hash(req.body.password, 10)// salage 10 fois du mot de passe.
  .then(hash => {
    const user = new User({
      email: emailCryptoJs,
      password: hash
    });

    console.log("------->CONTENU : user - controllers/user.js");
    console.log(user);

    user.save()
    .then(() => res.status(201).json ({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json ({ error }));
  })
  .catch(error => res.status(500).json ({ error }).send(console.log(error)));
};

exports.login = (req, res, next) => {
  User.findOne ({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json ({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json ({ error: 'Mot de passe incorrect !' });
      }
      res.status(200).json ({
        userId: user._id,
        token: jwt.sign(
          { userId: user._id },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' }
          )
      });
    })
    .catch(error => res.status(500).json ({ error }));
  })
  .catch(error => res.status(500).json ({ error }));
};