const Book = require('../models/Books.js');

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


exports.bestRating = (req, res, next) => {

};