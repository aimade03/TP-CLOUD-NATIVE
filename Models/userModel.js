const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: { type: String,required: true,unique: true},
    Nom_complet: {type: String,required: true,minlength: 5},
    username: {type: String,required: true,minlength: 5},
    mdp: {type: String,required: true,minlength: 5}
});
module.exports = mongoose.model('User', userSchema);
