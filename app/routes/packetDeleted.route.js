const express = require('express');
const packetsDeleted = require('../controllers/packetDeleted.controller');

const router = express.Router();

router.route('/')
    .get(packetsDeleted.findAll)
    .post(packetsDeleted.restore)
router.route('/:id')
    .delete(packetsDeleted.delete)

module.exports = router;