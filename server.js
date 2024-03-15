const userRouter = require('./Routes/user');
const auteurRouter = require('./Routes/auteur');
const editeurRouter = require('./Routes/editeur');
const livreRouter = require('./Routes/livre');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();
app.use(express.json());
// Connexion base de donne
mongoose.connect(process.env.URL_MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected'))
    .catch(err => console.error(' false ', err));

app.use('/auteurs', require('./Routes/auteur'));
app.use('/editeur', require('./Routes/editeur'));
app.use('/livre', require('./Routes/livre'));

app.post('/register', async (req, res) => {
});

app.post('/login', async (req, res) => {
    });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// =====================================================================================




