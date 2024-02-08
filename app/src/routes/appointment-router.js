"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/appointment-controller');
const auth = require('../middlewares/auth-middleware');
const validator = require('../middlewares/appointment-validation');

router.post("/", auth.isAuth, ctrl.makeAppointment);
router.patch("/:appointmentId", auth.isAuth, ctrl.modifyAppointment);
router.patch("/:appointmentId/status", auth.isAuth, validator.validStatus, ctrl.modifyAppointmentStatus);

module.exports = router;