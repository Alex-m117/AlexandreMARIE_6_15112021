const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    // Enlever "Bearer" du token pour le réutiliser par la suite.
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    // Décodage du token avec la clé "env JWY_KEY_TOKEN"
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
    console.log(decodedToken);
    // Récupération de l'userId dans le token.
    const userId = decodedToken.userId;
    req.auth = { userId };
    console.log(userId)
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Identifiant utilisateur invalide !';
    } else {
      // Passage au Middleware suivant si la comparaison du userId est valide.
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête invalide !')
    });
  }
};