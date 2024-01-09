"use strict"

const pool = require('../config/db/mysql');

async function checkDuplicateEmail(email) {
    const [rows] = await pool.execute(
        'SELECT * FROM user WHERE email = ?',
        [email]
    );
    return rows.length > 0;
}

module.exports = {
    checkDuplicateEmail,
};