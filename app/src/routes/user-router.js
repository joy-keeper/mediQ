"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/user-controller');
const validation = require('../middlewares/user-validation');
const auth = require('../middlewares/auth-middleware');

router.get("/emails", validation.emailRequest, ctrl.checkEmailDuplication);
router.post("/", validation.signupRequest, ctrl.register);
router.patch("/:userId", auth.check, validation.modifyRequest, ctrl.modifyUser);
router.post("/login", ctrl.login);

module.exports = router;