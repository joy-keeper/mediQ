"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/appointment-controller');
const auth = require('../middlewares/auth-middleware');

router.post("/", auth.check, ctrl.makeAppointment);

module.exports = router;