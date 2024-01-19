"use strict"

const { convertToCamelCase, convertToSnakeCase } = require('../utils/util');
const pool = require('../config/db/mysql');

async function findUserByEmail(email) {
    const [rows] = await pool.execute(
        `SELECT * FROM user WHERE email = ?`,
        [email]
    );
    return rows.length > 0 ? rows[0] : null;
}

async function createNewUser(userDTO) {
    const query = `INSERT INTO user (email, password, name, gender, address, phone_number) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [userDTO.email, userDTO.password, userDTO.name, userDTO.gender, userDTO.address, userDTO.phoneNumber];
    await pool.execute(query, params);
}

async function updateUser(userId, modifyUserDTO) {
    modifyUserDTO = convertToSnakeCase(modifyUserDTO);
    const keys = Object.keys(modifyUserDTO);
    const values = Object.values(modifyUserDTO);
    const updateFields = keys.map(key => `${key} = ?`).join(', ');
    const sql = `UPDATE user SET ${updateFields} WHERE id = ?`;
    const [rows] = await pool.execute(sql, [...values, userId]);
    return rows.affectedRows > 0; //0이면 없는 userId
}

module.exports = {
    findUserByEmail,
    createNewUser,
    updateUser,
};