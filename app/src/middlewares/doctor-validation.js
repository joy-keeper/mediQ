"user strict"

const { param, query, validationResult } = require('express-validator');
const { BadRequestError } = require('../utils/custom-error');

const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError();
    }
    next();
};

const getDoctorSlotsRequest = [
    param('doctorId').not().isEmpty().isNumeric(),
    query('date')
        .matches(/^\d{4}-\d{2}-\d{2}$/),
    handleErrors
];

module.exports = {
    getDoctorSlotsRequest,
};