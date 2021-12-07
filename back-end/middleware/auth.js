console.log('--->test auth')

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    // Enlever "Bearer" du token pour le réutiliser par la suite.
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    req.token = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
    const userId = req.token.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid test request!')
    });
  }
};