const mongoose = require('mongoose');
const editeurSchema = new mongoose.Schema({
    nom: {type: String,required: true},
    adresse: String,
    pays: String,
    annee_fondation: Number
});
module.exports = mongoose.model('Editeur', editeurSchema);
