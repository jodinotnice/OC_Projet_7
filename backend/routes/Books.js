const express = require('express');
const auth = require('../middleware/auth.js');
const router = express.Router();

const booksCtrl = require('../controllers/Books.js');


//CREATION DE COMPTE
router.get('/', booksCtrl.allBooks);
//LOGIN
router.get('/:id', booksCtrl.book);
//LOGIN
/*router.get('/bestrating', booksCtrl.login);*/

module.exports = router;