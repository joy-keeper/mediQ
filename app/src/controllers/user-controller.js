"use strict";

const userService = require('../services/user-service');
const { ForbiddenError }= require('../utils/custom-error');
const { OK, CREATED } = require('../constants/httpStatusCodes');

const checkEmailDuplication = async (req, res) => {
    const { email } = req.query;
    const isDuplicate = await userService.doesEmailExist(email);
    const message = isDuplicate ? '중복된 이메일이 존재합니다' : '사용 가능한 이메일입니다';
    res.status(OK).json({
        message,
        isDuplicate
    });
};

const register = async (req, res) => {
    const userDTO = req.body;
    await userService.registerUser(userDTO);
    res.status(CREATED).json({
        message: '가입에 성공하셨습니다'
    });
};

const modifyUser = async (req, res) => {
    const userId = Number(req.params.userId); //이미 유효성 검증을 했으므로 NaN일수없음
    const modifyUserDTO = req.body;
    if (req.user.id !== userId) {
        throw new ForbiddenError();
    }
    await userService.modifyUser(userId, modifyUserDTO);
    res.status(OK).json({
        message: '수정을 완료하였습니다'
    });

}

const login = async (req, res) => {
    const loginDTO = req.body;
    const tokens = await userService.authenticateUser(loginDTO);
    res.cookie('accessToken', tokens.accessToken, {
        secure: false,
        httpOnly: true,
    });
    res.cookie('refreshToken', tokens.refreshToken, {
        secure: false,
        httpOnly: true,
    });
    res.status(OK).json({
        message: '로그인에 성공하셨습니다',
    });
}

module.exports = {
    checkEmailDuplication,
    register,
    modifyUser,
    login,
};
