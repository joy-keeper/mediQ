"use strict"

const jwt = require('jsonwebtoken');

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1h'});
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '24h' });
};

module.exports = {
    createAccessToken,
    createRefreshToken
};
