// Déclarations des constantes des dépendencies d'app.js.
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Importation de la base de donnée Mongo DB.
const mongoose = require("./mongo/db");

// Création de l'application Express.
const app = express();

// Importation de body-parser.
const bodyParser = require ('body-parser');
// Permet de log les requêtes et les réponses.
app.use(morgan("dev"));

// Intégration de la méthode CORS.
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// test
app.use((req, res, next) => {
	res.json({ message: 'test loading 5' }); 
});

app.use(bodyParser.json());

// Traitement des requêtes pour les images via path.
app.use('/images', express.static(path.join(__dirname, 'images')));

// Déclaration des routes
const sauceRoutes = require ('./routes/sauce');
const userRoutes = require ('./routes/user');

app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;