"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/user");

router.get("/account", ctrl.output.account);

router.post("/checkEmail", ctrl.process.checkEmail);

module.exports = router;