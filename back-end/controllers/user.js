// Déclaration des modules d'authentification sécurisés (token et hash).
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');
const cryptojs = require('crypto-js');

// Importation models de la base de données "User.js".
const User = require ("../models/User");

// Importation des variables d'environnement via le package "dotenv"
const dotenv = require('dotenv');
const result = dotenv.config();

exports.signup = (req, res, next) => {

  const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();

  bcrypt.hash(req.body.password, 10)// salage 10 fois du mot de passe.
  .then(hash => {
    const user = new User({
      email: emailCryptoJs,
      password: hash
    });

    user.save()
    .then(() => res.status(201).json ({ message: 'Utilisateur créé et sauvegardé !' }))
    .catch(error => res.status(400).json ({ message: error.message }));
  })
  .catch(error => res.status(500).json ({ error }).send(console.log(error)));
};

exports.login = (req, res, next) => {

  const emailCryptoJs = cryptojs
  .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`)
  .toString();

  // Cherche dans la base de donnée Mondo DB si l'utilisateur est bien présent.
  User.findOne ({ email: emailCryptoJs })
  // Si l'email de l'user n'est pas présent, l'avertir qu'il n'est pas trouvé.
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
        // Encodage du userId pour la création de nouvelles sauces (objet et userId seront lié).
        userId: user._id,
        token: jwt.sign(
          { userId: user._id },
          `${process.env.JWT_KEY_TOKEN}`,
          { expiresIn: "12h" }
          )
      });
    })
    .catch(error => res.status(500).json ({ error }));
  })
  .catch(error => res.status(500).json ({ error }));
};