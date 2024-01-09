"use strict"

const userModel = require('../models/user');

async function checkDuplicateEmail(email) {
    try {
        const isDuplicate = await userModel.checkDuplicateEmail(email);
        if(isDuplicate) {
            console.log("중복입니다.");
        } else {
            console.log("중복이 아닙니다.");
        }
        return isDuplicate;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    checkDuplicateEmail,
};