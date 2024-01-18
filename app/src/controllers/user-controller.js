"use strict";

const userService = require('../services/user-service');

const checkEmailDuplication = async (req, res) => {
    const { email } = req.query;
    try {
        const isDuplicate = await userService.doesEmailExist(email);
        const message = isDuplicate ? '중복된 이메일이 존재합니다.' : '사용 가능한 이메일입니다.';
        res.status(200).json({
            status: 200,
            message,
            isDuplicate
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: '이메일 중복 확인하는데 문제가 발생했습니다.'
        });
    }
};

const register = async (req, res) => {
    const userDTO = req.body;
    try {
        const isDuplicate = await userService.doesEmailExist(userDTO.email);
        if (isDuplicate) {
            return res.status(409).json({
                message: '중복된 이메일이 존재합니다.'
            });
        }

        await userService.registerUser(userDTO);
        console.log(userDTO.email, " 님이 가입을 성공하셨습니다.");
        res.status(201).json({
            message: `${userDTO.name} 님이 가입을 성공하셨습니다.`,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: '회원가입 하는 도중 문제가 발생했습니다.'
        });
    }
};

const modifyUser = async (req, res) => {
    const userId = Number(req.params.userId); //이미 유효성 검증을 했으므로 NaN일수없음
    const modifyUserDTO = req.body;

    if (req.user.id !== userId) {
        return res.status(403).json({ message: '권한이 없습니다.' });
    }
    try {
        const result = await userService.modifyUser(userId, modifyUserDTO);
        if (!result) {
            res.status(400).json({
                message: '잘못된 요청입니다.'
            });
        } else {
            res.status(200).json({
                message: '수정을 완료하였습니다.'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: '수정 하는 도중 문제가 발생했습니다.'
        });
    }
}

const login = async (req, res) => {
    const loginDTO = req.body;
    try {
        const tokens = await userService.authenticateUser(loginDTO);
        if (tokens) {
            res.cookie('accessToken', tokens.accessToken, {
                secure: false,
                httpOnly: true,
            });
            res.cookie('refreshToken', tokens.refreshToken, {
                secure: false,
                httpOnly: true,
            });
            res.status(200).json({
                message: '로그인에 성공하셨습니다.',
            });
            console.log("로그인 성공");
            console.log(tokens);
        } else {
            res.status(401).json({
                message: '로그인에 실패하셨습니다.'
            });
            console.log("로그인 실패");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: '로그인 중 문제가 발생했습니다.'
        });
    }
}

module.exports = {
    checkEmailDuplication,
    register,
    modifyUser,
    login,
};
