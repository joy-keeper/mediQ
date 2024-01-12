"use strict";

const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    console.log("홈화면으로 이동");
    res.render("home/index");
});

router.get('/account', (req, res) => {
    console.log("로그인 및 회원가입 화면으로 이동");
    res.render("user/account");
});

module.exports = router;