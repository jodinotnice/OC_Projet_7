const express = require('express');
const auth = require('../middleware/auth.js');
const router = express.Router();
const multer = require('../middleware/multer-config');
const booksCtrl = require('../controllers/Books.js');




//AFFICHER TOUS LES BOOKS
router.get('/', booksCtrl.allBooks);
//POSTER UN BOOK
router.post('/', auth, multer, booksCtrl.createBook);
//CLASSEMENT 3 MEILLEURS BOOKS
router.get('/bestrating', booksCtrl.bestrating);
//AFFICHER UN BOOKS
router.get('/:id', booksCtrl.book);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.put('/:id', auth, multer, booksCtrl.updateBooks);



module.exports = router;