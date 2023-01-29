const express = require('express');
const destinations = require('../controllers/destination.controller');

const router = express.Router();

router.route('/')
    .get(destinations.findAll)
    .post(destinations.create)
    .delete(destinations.deleteAll)

router.route('/:id')
    .get(destinations.findOne)
    .put(destinations.update)
    .delete(destinations.delete)


module.exports = router;