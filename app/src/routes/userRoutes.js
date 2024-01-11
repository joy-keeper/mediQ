"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/userController');
const auth = require('../middlewares/auth-middleware');
const userValidation = require('../middlewares/user-validation');


router.get("/emails", userValidation.validateEmail, ctrl.checkEmailDuplication);
router.post("/", userValidation.validateSignup, ctrl.register);
router.post("/login", ctrl.login);

module.exports = router;