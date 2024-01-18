"use strict"

const bcrypt = require('bcrypt');
const token = require('../utils/token');
const userModel = require('../models/user-model');

async function doesEmailExist(email) {
    const user = await userModel.findUserByEmail(email);
    return !!user;
}

async function registerUser(userDTO) {
    const hashedPassword = await bcrypt.hash(userDTO.password, 10);
    userDTO.password = hashedPassword;
    await userModel.createNewUser(userDTO);
}

async function authenticateUser(loginDTO) {
    const user = await userModel.findUserByEmail(loginDTO.email);
    if (!user) {
        return null;
    }

    const isPasswordMatch = await bcrypt.compare(loginDTO.password, user.password);
    if (!isPasswordMatch) {
        return null;
    }

    const payload = {
        id: user.id,
        role: user.role,
    };

    const tokens = {
        accessToken: token.createAccessToken(payload),
        refreshToken: token.createRefreshToken(payload)
    };
    return tokens;
}

async function modifyUser(userId, modifyUserDTO) {
    // DTO에 password가 있다면 암호화
    if(modifyUserDTO.password) {
        const hashedPassword = await bcrypt.hash(modifyUserDTO.password, 10);
        modifyUserDTO.password = hashedPassword;
    }
    return await userModel.updateUser(userId, modifyUserDTO);
}

module.exports = {
    doesEmailExist,
    registerUser,
    authenticateUser,
    modifyUser,
};