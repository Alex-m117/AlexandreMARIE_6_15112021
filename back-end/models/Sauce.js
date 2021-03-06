// Création du modèle de la sauce qui sera à compléter par le front pour l'intégration des données et modifications de ses informations par le CRUD.
const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({

	userId: { type: String, required: true },
	name: { type: String, required: true },
	manufacturer: { type: String, required: true },
	description: { type: String, required: true },
	mainPepper: { type: String, required: true },
	imageUrl: { type: String, required: true },
	heat: { type: Number, required: true },
	likes: { type: Number, default:0, required: false},
	dislikes: { type: Number, default:0, required: false},
	usersLiked: { type: Array },
	usersDisliked: { type: Array },
});

module.exports = mongoose.model('Sauce', sauceSchema);