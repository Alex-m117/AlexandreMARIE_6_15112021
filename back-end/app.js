// Déclarations des constantes des dépendencies d'app.js.
const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');
const path = require('path');

// Déclaration des routes
const sauceRoutes = require ('./routes/sauce');
const userRoutes = require ('./routes/user');

// Importation de la base de donnée Mongo DB.
const mongoose = require("./mongo/db");

// Création de l'application Express.
const app = express();

// Importation de body-parser.
const bodyParser = require ('body-parser');

// Permet de log les requêtes et les réponses.
app.use(morgan("dev"));

// Debug Mongoose.
//mongoose.set('debug', true);

// Intégration de la méthode CORS.
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(helmet());

app.use(bodyParser.json());

// Traitement des requêtes pour les images via path.
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;