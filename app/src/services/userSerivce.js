"use strict"

const bcrypt = require('bcrypt');
const user = require('../models/user');

async function checkDuplicateEmail(email) {
    try {
        const isDuplicate = await user.checkDuplicateEmail(email);
        (isDuplicate) ? console.log("중복입니다.") : console.log("중복이 아닙니다.");
        return isDuplicate;
    } catch (error) {
        throw error;
    }
}

async function registerUser(userDTO) {
    try {
        const hashedPassword = await bcrypt.hash(userDTO.password, 10);
        userDTO.password = hashedPassword;
        await user.createNewUser(userDTO);
        console.log(userDTO.email, " 님이 가입을 성공하셨습니다.");
    } catch (error) {
        console.log(error);
        console.log(userDTO.email, " 님이 가입을 실패하셨습니다.");
        throw error;
    }
}

module.exports = {
    checkDuplicateEmail,
    registerUser,
};