const express = require('express');
const account = require('../controllers/account.controller')
const router = express.Router();


router.route('/')
    .post(account.register)


module.exports = router;
