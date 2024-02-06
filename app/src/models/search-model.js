"use strict"

const pool = require('../config/db/mysql');

async function findHospitalName(keyword) {
    const query = `SELECT * FROM hospital WHERE name LIKE ?`;
    const values = [`%${keyword}%`]
    const [rows] = await pool.execute(query, values);
    return rows
}

async function findHospitalSpecialty(keyword) {
    const query = `SELECT * FROM specialty WHERE specialty_name LIKE ?`;
    const values = [`%${keyword}%`]
    const [rows] = await pool.execute(query, values);
    return rows
}

module.exports = {
    findHospitalName,
    findHospitalSpecialty
}