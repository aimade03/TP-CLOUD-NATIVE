const express = require('express');
const router = express.Router();
const Auteur = require('../Models/auteurModel');
const Editeur = require('../Models/editeurModel');

router.get('/all', (req, res) => {
    Auteur.find({}, (err, auteurs) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(auteurs);
        }
    });
});
router.get('/names', (req, res) => {
    Auteur.find({}, 'Nom_complet', (err, noms) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(noms);
        }
    });
});
router.get('/editeurs', (req, res) => {
    Auteur.aggregate([
        {
            $lookup: {
                from: "editeurs",
                localField: "_id",
                foreignField: "auteur",
                as: "editeurs"
            }
        },
        {
            $project: {
                Nom_complet: 1,
                nombre_editeurs: { $size: "$editeurs" }
            }
        }
    ], (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(result);
        }
    });
});
router.post('/add', (req, res) => {
    const auteur = new Auteur({
        Nom_complet: req.body.Nom_complet,
        pays: req.body.pays,
        date_naissance: req.body.date_naissance
    });
    auteur.save((err, newAuteur) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(201).json(newAuteur);
        }
    });
});router.put('/update/:name', (req, res) => {
    Auteur.findOneAndUpdate(
        { Nom_complet: req.params.name },
        req.body,
        { new: true },
        (err, updatedAuteur) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.json(updatedAuteur);
            }
        }
    );
});
router.delete('/delete/:name', (req, res) => {
    Auteur.findOneAndDelete(
        { Nom_complet: req.params.name },
        (err, deletedAuteur) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.json({ message: 'Auteur supprimé', deletedAuteur });
            }
        }
    );
});
module.exports = router;