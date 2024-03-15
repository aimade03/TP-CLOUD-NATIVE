const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');
router.get('/all', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(users);
        }
    });
});
router.get('/names', (req, res) => {
    User.find({}, 'Nom_complet', (err, names) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(names);
        }
    });
});
router.post('/add', (req, res) => {
    const user = new User({
        email: req.body.email,
        Nom_complet: req.body.Nom_complet,
        username: req.body.username,
        mdp: req.body.mdp
    });
    user.save((err, newUser) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(201).json(newUser);
        }
    });
});

module.exports = router;
