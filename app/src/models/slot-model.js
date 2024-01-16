"use strict"

const { convertToCamelCase } = require('../utils/util');
const pool = require('../config/db/mysql');

async function findScheduleSlotWithMedicalScheduleById(scheduleSlotId, conn = null) {
    let query = `SELECT * FROM schedule_slot INNER JOIN medical_schedule ON schedule_slot.medical_schedule_id = medical_schedule.id WHERE schedule_slot.id = ?`;
    if (conn) {
        query += ' FOR UPDATE';
    }
    const [rows] = await (conn || pool).execute(query, [scheduleSlotId]);
    return rows.length > 0 ? convertToCamelCase(rows[0]) : null;
}

async function incrementAppointmentCount(scheduleSlotId, conn) {
    await conn.query('UPDATE schedule_slot SET current_appointments = current_appointments + 1, next_appointment_number = next_appointment_number + 1 WHERE id = ?', [scheduleSlotId]);
}

module.exports = {
    findScheduleSlotWithMedicalScheduleById,
    incrementAppointmentCount,
};