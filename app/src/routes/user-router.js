"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/user-controller');
const userValidation = require('../middlewares/user-validation');
const auth = require('../middlewares/auth-middleware');

router.get("/emails", userValidation.validateEmail, ctrl.checkEmailDuplication);
router.post("/", userValidation.validateSignup, ctrl.register);
router.patch("/:userId", auth.check, userValidation.validateModify, ctrl.modifyUser);
router.post("/login", ctrl.login);

module.exports = router;