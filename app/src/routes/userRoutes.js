"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/userController");

router.post("/", ctrl.register);
router.get("/emails", ctrl.checkEmail);

module.exports = router;