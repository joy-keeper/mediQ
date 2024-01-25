"use strict"

const pool = require('../config/db/mysql');
const { convertToCamelCase } = require('../utils/util');

async function findAppointmentById(appointmentId) {
    const query = `SELECT * FROM appointment WHERE id = ?`;
    const [rows] = await pool.execute(query, [appointmentId]);
    return rows.length > 0 ? convertToCamelCase(rows[0]) : null;
}

async function findAppointmentByUserIdAndSlotId(userId, scheduleSlotId) {
    const query = `SELECT * FROM appointment WHERE user_id = ? AND schedule_slot_id = ? AND status = 'confirmed'`;
    const [rows] = await pool.execute(query, [userId, scheduleSlotId]);
    return rows.length > 0;
}

async function insertAppointment(userId, appointmentNumber, appointmentDTO, conn) {
    const query = `INSERT INTO appointment (user_id, schedule_slot_id, appointment_number, notes, type) VALUES (?, ?, ?, ?, ?)`;
    const params = [userId, appointmentDTO.scheduleSlotId, appointmentNumber, appointmentDTO.notes, appointmentDTO.type];
    await conn.execute(query, params);
}

async function updateAppointment(appointmentId, updateData) {
    const keys = Object.keys(updateData);
    const values = Object.values(updateData);
    const updateFields = keys.map(key => `${key} = ?`).join(', ');
    const sql = `UPDATE appointment SET ${updateFields} WHERE id = ?`;
    await pool.execute(sql, [...values, appointmentId]);
}

module.exports = {
    findAppointmentById,
    findAppointmentByUserIdAndSlotId,
    insertAppointment,
    updateAppointment,
};