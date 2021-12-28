// Importation des variables d'environnement via le package "dotenv" pour sécurisée les données de la bases de données.
const dotenv = require('dotenv');
const result = dotenv.config();

// Connection à la base de donnée Mongo DB.
const mongoose = require('mongoose');

mongoose.connect(
	`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority` ,
	{ useNewUrlParser: true,
		useUnifiedTopology: true })
.then(() => console.log ('Connexion à MongoDB réussie !'))
.catch(() => console.log ('Connexion à MongoDB échouée !'));

module.exports = mongoose;