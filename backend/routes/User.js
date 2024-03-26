const express = require('express');
const auth = require('../middleware/auth.js');
const router = express.Router();

const userCtrl = require('../controllers/User.js');


//CREATION DE COMPTE
router.post('/signup', userCtrl.signup);
//LOGIN
router.post('/login', userCtrl.login);


module.exports = router;