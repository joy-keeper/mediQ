"user strict"

const { check, validationResult } = require('express-validator');

const emailCheck = check('email', '이메일이 유효하지 않습니다.').isEmail();

const validateEmail = [
    emailCheck,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    },
];

const validateSignup = [
    emailCheck,
    check('password', '비밀번호는 최소 8자 이상이어야 합니다.').isLength({ min: 8 }),
    check('name', '이름은 필수 항목입니다.').not().isEmpty(),
    check('gender', '성별은 남자 또는 여자 여야합니다.').isIn(['M', 'F']),
    check('address', '주소는 필수 항목입니다.').not().isEmpty(),
    check('phoneNumber', '전화번호는 필수 항목입니다.').isMobilePhone('ko-KR'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: messages.join('\n') });
        }
        next();
    },
];

module.exports = {
    validateEmail,
    validateSignup
};