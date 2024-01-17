"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/user-controller');
const userValidation = require('../middlewares/user-validation');

router.get("/emails", userValidation.validateEmail, ctrl.checkEmailDuplication);
router.post("/", userValidation.validateSignup, ctrl.register);
router.post("/login", ctrl.login);

module.exports = router;