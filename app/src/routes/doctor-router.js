"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/doctor-controller');
const auth = require('../middlewares/auth-middleware');

router.get("/:doctorId/slots", auth.check, ctrl.getSlotsList);

module.exports = router;