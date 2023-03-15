const express = require('express');
const account = require('../controllers/account.controller')
const router = express.Router();


router.route('/register')
    .post(account.register)

router.route('/login')
    .post(account.login)

router.route('/user/:id')
    .get(account.findOne)


module.exports = router;
