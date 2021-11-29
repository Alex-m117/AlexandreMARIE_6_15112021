const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');




mongoose.connect('mongodb+srv://Alex117:MDP151121@Cluster0.gppcf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création de l'application Express.
const app = express();

// Permet de log les requêtes et les réponses.
app.use(morgan("dev"));

// Intégration méthode CORS.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use((req, res, next) => {
   res.json({ message: 'test loading 1' }); 
});

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;