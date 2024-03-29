const express = require('express');
const auth = require('../middleware/auth.js');
const router = express.Router();
const multer = require('../middleware/multer-config');
const booksCtrl = require('../controllers/Books.js');


//AFFICHER TOUS LES LIVRE
router.get('/', booksCtrl.allBooks);
//POSTER UN LIVRE
router.post('/', auth, multer, booksCtrl.createBook);
//CLASSEMENT 3 MEILLEURS LIVRES
router.get('/bestrating', booksCtrl.bestrating);
//AFFICHER UN LIVRE
router.get('/:id', booksCtrl.book);
//SUPPRIMER UN LIVRE
router.delete('/:id', auth, booksCtrl.deleteBook);
//MODIFIER UN LIVRE
router.put('/:id', auth, multer, booksCtrl.updateBooks);
//NOTER UN BOOKS
router.post('/:id/rating', auth, booksCtrl.rating);


module.exports = router;