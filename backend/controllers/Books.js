const Book = require('../models/Books.js');
const fs = require('fs');


exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;

  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  console.log('Contenu de la requête :', req.auth.userId);
  book.save()
  .then(() => { res.status(201).json({message: 'Livre enregistré !'})})
  .catch(error => {
    console.log('Erreur 400 :', error.message); 
    res.status(400).json( { error })});
};

exports.allBooks = (req, res, next) => {
  Book.find()
  .then(books => res.status(200).json(books))
  .catch(error => res.status(400).json({ error }));
};


exports.book = (req, res, next) => {
  console.log(req.params);
  Book.findOne({ _id: req.params.id})
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};


exports.bestrating = (req, res, next) => {
  Book.find().sort({ averageRating: -1 }).limit(3)
    .then(books => res.status(200).json( books ))
    .catch(error => res.status(400).json({ error })); 
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id})
  .then(book => {
    if (book.userId != req.auth.userId) {
      res.status(401).json({message: 'Non Autorisé'});
    } else {
      const filename = book.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Book.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Livre supprimé'}))
        .catch(error => res.status(401).json({error}));
      })
    }
  })
  .catch(error => res.status(500).json({ error }));
};

exports.updateBooks = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete bookObject._userId;
  Book.findOne({_id: req.params.id})
  .then((book) => {
    if (book.userId != req.auth.userId) {
      res.status(401).json({ message : 'Non autorisé'});
    } else {
      Book.updateOne({ _id: req.params.id}, {...bookObject, _id: req.params.id})
      .then(() => res.status(200).json({message : 'Livre modifié!'}))
      .catch(error => res.status(401).json({ error}));
    }
    
  }) 
  .catch((error) => {
    res.status(400).json({error})
  })
  
}

exports.rating = (req, res) => {

  const user = req.body.userId;
  if (user !== req.auth.userId) {
      res.status(401).json({ message: 'Non autorisé' })
  } else {
      Book.findOne({ _id: req.params.id })
          .then(book => {
              if (book.ratings.find(rating => rating.userId === user)) {
                  res.status(401).json({ message: 'Notation déjà effectuée' })
              } else {
                  const newRating = {
                      userId: user,
                      grade: req.body.rating,
                      _id: req.body._id
                  };
                  const updatedRatings = [
                      ...book.ratings,
                      newRating
                  ];

                  function calcAverageRating(ratings) {
                      const sumRatings = ratings.reduce((total, rate) => total + rate.grade, 0);
                      const average = sumRatings / ratings.length;
                      return parseFloat(average.toFixed(2));
                  };

                  const updateAverageRating = calcAverageRating(updatedRatings);
                  Book.findOneAndUpdate(
                      { _id: req.params.id, 'ratings.userId': { $ne: user } },
                      { $push: { ratings: newRating }, averageRating: updateAverageRating },
                      { new: true }
                  )
                      .then(updatedBook => res.status(201).json(updatedBook))
                      .catch(error => res.status(401).json({ error }));
              };
          })
          .catch(error => res.status(401).json({ error }));
  }
}
