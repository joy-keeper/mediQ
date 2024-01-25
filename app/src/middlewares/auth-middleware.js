"use strict"

const jwt = require('jsonwebtoken');
const token = require('../utils/token');
const { UnauthorizedError } = require('../utils/custom-error');

const check = async (req, res, next) => {
    let accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new UnauthorizedError();
    }
    try {
        req.user = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
        try {
            const { id, role } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
            const user = { id, role };
            const accessToken = token.createAccessToken(user);
            res.cookie('accessToken', accessToken, {
                secure: false,
                httpOnly: true,
            });
            req.user = user;
        } catch (err) {
            throw new UnauthorizedError();
        }
    }
    next();
};

module.exports = {
    check
};
