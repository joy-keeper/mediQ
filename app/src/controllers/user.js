"use strict";

const userService = require('../services/userService');

const output = {
    account: (req, res) => {
        console.log("로그인 및 회원가입 화면으로 이동");
        res.render("user/account");
    }
};

const process = {
    checkEmail: async (req, res) => {
        const { email } = req.body;
        try {
          const isDuplicate = await userService.checkDuplicateEmail(email);
          res.json({ isDuplicate });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = {
    output,
    process,
};
