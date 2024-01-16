"use strict"

const pool = require('../config/db/mysql');

async function findAppointmentByUserIdAndSlotId(userId, scheduleSlotId) {
    const query = `SELECT * FROM appointment WHERE user_id = ? AND schedule_slot_id = ? AND status = '예약완료'`;
    const [rows] = await pool.execute(query, [userId, scheduleSlotId]);
    return rows.length > 0;
}

async function insertAppoint(userId, appointmentNumber, appointmentDTO, conn) {
    const query = `INSERT INTO appointment (user_id, schedule_slot_id, appointment_number, notes, type) VALUES (?, ?, ?, ?, ?)`;
    const params = [userId, appointmentDTO.scheduleSlotId, appointmentNumber, appointmentDTO.notes, appointmentDTO.type];
    await conn.execute(query, params);
}

module.exports = {
    findAppointmentByUserIdAndSlotId,
    insertAppoint,
};