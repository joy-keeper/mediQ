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

async function updateAppointmentStatus(appointmentId, status) {
    const sql = 'UPDATE appointment SET status = ? WHERE id = ?';
    await pool.execute(sql, [status, appointmentId]);
}

async function countConfirmedAppointmentsBySlotId(scheduleSlotId, conn = null, forUpdate = false) {
    let query = `SELECT COUNT(*) AS count FROM appointment WHERE schedule_slot_id = ? AND status = 'confirmed'`;
    if (forUpdate) {
        query += ' FOR UPDATE';
    }
    const [rows] = await (conn || pool).execute(query, [scheduleSlotId]);
    return rows[0].count;
}

async function getNextAppointmentNumber(scheduleSlotId, conn) {
    const query = `SELECT MAX(appointment_number) AS maxAppointmentNumber FROM appointment WHERE schedule_slot_id = ?`;
    const [rows] = await conn.execute(query, [scheduleSlotId]);
    return rows[0].maxAppointmentNumber !== null ? rows[0].maxAppointmentNumber + 1 : 1;
}

module.exports = {
    findAppointmentById,
    findAppointmentByUserIdAndSlotId,
    insertAppointment,
    updateAppointment,
    updateAppointmentStatus,
    countConfirmedAppointmentsBySlotId,
    getNextAppointmentNumber,
};