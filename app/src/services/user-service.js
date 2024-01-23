"use strict"

const bcrypt = require('bcrypt');
const token = require('../utils/token');
const userModel = require('../models/user-model');
const AppError = require('../utils/custom-error');

async function doesEmailExist(email) {
    const user = await userModel.findUserByEmail(email);
    return !!user;
}

async function registerUser(userDTO) {
    const user = await userModel.findUserByEmail(userDTO.email);
    if (user) {
        throw new AppError('중복된 이메일이 존재합니다.', 409);
    }
    const hashedPassword = await bcrypt.hash(userDTO.password, 10);
    userDTO.password = hashedPassword;
    await userModel.createNewUser(userDTO);
}

async function modifyUser(userId, modifyUserDTO) {
    // DTO에 password가 있다면 암호화
    if (modifyUserDTO.password) {
        const hashedPassword = await bcrypt.hash(modifyUserDTO.password, 10);
        modifyUserDTO.password = hashedPassword;
    }
    const result = await userModel.updateUser(userId, modifyUserDTO);
    if (!result) {
        throw new AppError('잘못된 요청입니다.', 400);
    }
}

async function authenticateUser(loginDTO) {
    const user = await userModel.findUserByEmail(loginDTO.email);
    if (!user) {
        throw new AppError('로그인에 실패하였습니다.', 401);
    }

    const isPasswordMatch = await bcrypt.compare(loginDTO.password, user.password);
    if (!isPasswordMatch) {
        throw new AppError('로그인에 실패하였습니다.', 401);
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

module.exports = {
    doesEmailExist,
    registerUser,
    modifyUser,
    authenticateUser,
};