"user strict"

const { check, body, param, validationResult } = require('express-validator');

const emailCheck = check('email', '이메일이 유효하지 않습니다.').isEmail();
const userIdCheck = param('userId', '요청이 유효하지 않습니다.').not().isEmpty().matches(/^[1-9][0-9]*$/);
const modifyUserBodyCheck = body().custom(body => {
    const allowedFields = ['password', 'name', 'gender', 'address', 'phoneNumber'];
    const keys = Object.keys(body);
    const hasNotAllowedFields = keys.some(key => !allowedFields.includes(key));
    if (hasNotAllowedFields) {
        throw new Error('요청이 유효하지 않습니다.');
    }
    return true;
});

const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map(error => error.msg);
        return res.status(400).json({ message: messages.join('\n') });
    }
    next();
};

const validateEmail = [
    emailCheck,
    handleErrors
];

const validateSignup = [
    emailCheck,
    body('password', '비밀번호는 최소 8자 이상이어야 합니다.').isLength({ min: 8 }),
    body('name', '이름은 필수 항목입니다.').not().isEmpty(),
    body('gender', '성별은 남자 또는 여자여야합니다.').isIn(['M', 'F']),
    body('address', '주소는 필수 항목입니다.').not().isEmpty(),
    body('phoneNumber', '전화번호는 유효한 형식이어야 합니다.').matches(/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/),
    handleErrors
];

const validateModify = [
    userIdCheck,
    modifyUserBodyCheck,
    body('password', '비밀번호는 최소 8자 이상이어야 합니다.').optional().isLength({ min: 8 }),
    body('name', '이름은 필수 항목입니다.').optional().not().isEmpty(),
    body('gender', '성별은 남자 또는 여자여야합니다.').optional().isIn(['M', 'F']),
    body('address', '주소는 필수 항목입니다.').optional().not().isEmpty(),
    body('phoneNumber', '전화번호는 유효한 형식이어야 합니다.').optional().matches(/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/),
    handleErrors
];

module.exports = {
    validateEmail,
    validateSignup,
    validateModify,
};