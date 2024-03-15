const express = require('express');
const router = express.Router();
const Editeur = require('../Models/editeurModel');


router.get('/all', (req, res) => {
    Editeur.find({}, (err, editeurs) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(editeurs);
        }
    });
});

router.get('/names', (req, res) => {
    Editeur.find({}, 'Nom_editeur', (err, noms) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(noms);
        }
    });
});


router.post('/add', (req, res) => {
    const editeur = new Editeur({
        Nom_editeur: req.body.Nom_editeur,
        pays: req.body.pays
    });
    editeur.save((err, newEditeur) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(201).json(newEditeur);
        }
    });
});

router.put('/update/:name', (req, res) => {
    Editeur.findOneAndUpdate(
        { Nom_editeur: req.params.name },
        req.body,
        { new: true },
        (err, updatedEditeur) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.json(updatedEditeur);
            }
        }
    );
});

router.delete('/delete/:name', (req, res) => {
    Editeur.findOneAndDelete(
        { Nom_editeur: req.params.name },
        (err, deletedEditeur) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.json({ message: 'Éditeur supprimé', deletedEditeur });
            }
        }
    );
});

module.exports = router;
