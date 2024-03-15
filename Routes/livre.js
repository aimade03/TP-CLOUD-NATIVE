const express = require('express');
const router = express.Router();
const Livre = require('../Models/livreModel');

router.get('/all', (req, res) => {
    Livre.find({}, (err, livres) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(livres);
        }
    });
});

router.get('/auteurs/:livrename', (req, res) => {
    Livre.findOne({ Titre: req.params.livrename }, 'Auteurs', (err, livre) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(livre.Auteurs);
        }
    });
});

router.get('/editeurs/:livrename', (req, res) => {
    Livre.findOne({ Titre: req.params.livrename }, 'Editeurs', (err, livre) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(livre.Editeurs);
        }
    });
});

router.get('/listCategorie/:category', (req, res) => {
    Livre.find({ Categorie: req.params.category }, (err, livres) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(livres);
        }
    });
});

router.get('/:annee1/:annee2', (req, res) => {
    Livre.find({ Annee: { $gte: req.params.annee1, $lte: req.params.annee2 } }, (err, livres) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(livres);
        }
    });
});

router.post('/add', (req, res) => {
    const livre = new Livre(req.body);
    livre.save((err, newLivre) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(201).json(newLivre);
        }
    });
});

router.put('/update/:name', (req, res) => {
    Livre.findOneAndUpdate(
        { Titre: req.params.name },
        req.body,
        { new: true },
        (err, updatedLivre) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.json(updatedLivre);
            }
        }
    );
});

router.delete('/delete/:name', (req, res) => {
    Livre.findOneAndDelete(
        { Titre: req.params.name },
        (err, deletedLivre) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.json({ message: 'Livre supprimé', deletedLivre });
            }
        }
    );
});

module.exports = router;
