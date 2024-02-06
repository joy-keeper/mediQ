"use strict"

const { BadRequestError } = require("../utils/custom-error");

const validStatuses = ['cancelled', 'completed', 'absent'];

const validStatus = (req, res, next) => {
    const { status } = req.body;
    if (!validStatuses.includes(status)) {
        throw new BadRequestError();
    }
    next();
};

module.exports = {
    validStatus,
}