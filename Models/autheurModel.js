const mongoose = require('mongoose');
const auteurSchema = new mongoose.Schema({
    nom: {type: String,required: true},
    pays: String,
    date_naissance: Date
});
module.exports = mongoose.model('Auteur', auteurSchema);
