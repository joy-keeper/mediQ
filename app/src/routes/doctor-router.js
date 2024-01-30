"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/doctor-controller');
const validation = require('../middlewares/doctor-validation');
const auth = require('../middlewares/auth-middleware');

router.get("/:doctorId/slots", auth.isAuth, validation.getDoctorSlotsRequest, ctrl.getSlotsList);

module.exports = router;