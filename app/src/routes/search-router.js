"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/search-controller');

router.get('/', function(req, res) {
    res.render('../views/home/search.ejs');
});

router.get('/list', ctrl.searchKeyword);

module.exports = router;