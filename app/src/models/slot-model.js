"use strict"

const { convertToCamelCase } = require('../utils/util');
const pool = require('../config/db/mysql');

async function findScheduleSlotWithMedicalScheduleById(scheduleSlotId, conn = null) {
    const query = `SELECT * FROM schedule_slot INNER JOIN medical_schedule ON schedule_slot.medical_schedule_id = medical_schedule.id WHERE schedule_slot.id = ?`;
    const [rows] = await (conn || pool).execute(query, [scheduleSlotId]);
    return rows.length > 0 ? convertToCamelCase(rows[0]) : null;
}

async function findSlotMaxAppointments(scheduleSlotId, conn = null) {
    const query = `SELECT slot_max_appointments FROM schedule_slot WHERE schedule_slot.id = ?`;
    const [rows] = await (conn || pool).execute(query, [scheduleSlotId]);
    return convertToCamelCase(rows[0]);
}

async function selectScheduleByDoctorIdAndDate(doctorId, date) {
    const query = `
      SELECT 
      schedule_slot.id AS schedule_slot_id,
      medical_schedule.id AS medical_schedule_id,
      medical_schedule.doctor_id,
      schedule_slot.slot_date,
      medical_schedule.start_time,
      medical_schedule.end_time,
      schedule_slot.slot_max_appointments
      FROM medical_schedule
      JOIN schedule_slot ON medical_schedule.id = schedule_slot.medical_schedule_id
      WHERE medical_schedule.doctor_id = ?
        AND schedule_slot.slot_date = ?
        ORDER BY medical_schedule.start_time
    `;

    const [rows] = await pool.execute(query, [doctorId, date]);
    return rows.length > 0 ? convertToCamelCase(rows) : rows;
}

module.exports = {
    findScheduleSlotWithMedicalScheduleById,
    findSlotMaxAppointments,
    selectScheduleByDoctorIdAndDate,
};