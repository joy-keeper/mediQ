"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/appointment-controller');
const auth = require('../middlewares/auth-middleware');

router.post("/", auth.isAuth, ctrl.makeAppointment);
router.patch("/:appointmentId", auth.isAuth, ctrl.modifyAppointment);

module.exports = router;