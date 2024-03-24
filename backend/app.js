const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/User');
const userBooks= require('./routes/Books');


/*
const Book = require('./models/Books.js');*/


mongoose.connect('mongodb+srv://jordanakpovi:Breezy2292@cluster0.nxfgqm9.mongodb.net/',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//CREATION DE COMPTE


//LOGIN

 
//RECUPERER TOUS LES LIVRES




//RECUPERER TOUS LES LIVRES


//RECUPERER UN LIVRE


//RECUPERER 3 MEILLEURS LIVRES


//POST BOOK


app.use('/api/auth/', userRoutes);
app.use('/api/books/', userBooks);


module.exports = app;
