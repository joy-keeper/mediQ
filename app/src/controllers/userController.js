"use strict";

const userService = require('../services/userSerivce');

const checkEmail = async (req, res) => {
    const { email } = req.query;
    try {
        const isDuplicate = await userService.checkDuplicateEmail(email);
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
        const isDuplicate = await userService.checkDuplicateEmail(userDTO.email);
        if (isDuplicate) {
            return res.status(400).json({ 
                message: '중복된 이메일이 존재합니다.' 
            });
        }

        await userService.registerUser(userDTO);
        res.status(201).json({ 
            message: `${userDTO.name} 님이 가입을 성공하셨습니다.`, 
        });

    } catch (error) {
        res.status(500).json({ 
            message: '회원가입 하는 도중 문제가 발생했습니다.' 
        });
    }
};

module.exports = {
    checkEmail,
    register,
};
