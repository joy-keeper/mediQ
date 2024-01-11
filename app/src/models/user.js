"use strict"

const pool = require('../config/db/mysql');

async function findUserByEmail(email) {
    const [rows] = await pool.execute(
        `SELECT * FROM user WHERE email = ?`,
        [email]
    );
    return rows.length > 0 ? rows[0] : null;
}

async function createNewUser(userDTO) {
    console.log(userDTO);
    const role = "user";
    const query = `INSERT INTO user (email, password, name, gender, address, phone_number, role) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [userDTO.email, userDTO.password, userDTO.name, userDTO.gender, userDTO.address, userDTO.phoneNumber, role];
    await pool.execute(query, params);
}

module.exports = {
    findUserByEmail,
    createNewUser,
};