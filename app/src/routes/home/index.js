"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/home");

router.get("/", ctrl.output.home);

module.exports = router;