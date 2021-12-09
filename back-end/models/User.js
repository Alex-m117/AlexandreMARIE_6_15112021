const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator, { message: 'Erreur, cet email est déjà enregistrée.' });
userSchema.set('autoIndex', false);

module.exports = mongoose.model('User', userSchema);
