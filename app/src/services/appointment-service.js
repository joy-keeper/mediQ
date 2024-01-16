"use strict"

const appointmentModel = require('../models/appointment-model');
const slotModel = require('../models/slot-model');
const pool = require('../config/db/mysql');

const MINIMUM_TIME_BEFORE_APPOINTMENT = 30;

async function isValidAppointmentTime(scheduleSlotId) {
    const result = await slotModel.findScheduleSlotWithMedicalScheduleById(scheduleSlotId);
    if (result) {
        const { slotDate, startTime } = result;
        const date = new Date(slotDate);
        const formatted_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        const scheduleStart = new Date(formatted_date + ' ' + startTime);
        const now = new Date();
        now.setHours(now.getUTCHours() + 9); //한국 시간
        const diff = scheduleStart - now;
        return diff >= MINIMUM_TIME_BEFORE_APPOINTMENT * 60 * 1000; // 현재 시간으로부터 예약시간이 예약최소시간 이상인지 확인
    }
    return false;
}

async function hasDuplicateAppointment(userId, scheduleSlotId) {
    const existingAppointment = await appointmentModel.findAppointmentByUserIdAndSlotId(userId, scheduleSlotId);
    return !!existingAppointment;
}

async function createAppointment(userId, appointmentDTO) {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const slotInfo = await slotModel.findScheduleSlotWithMedicalScheduleById(appointmentDTO.scheduleSlotId, conn);
        if (slotInfo.currentAppointments < slotInfo.maxAppointments) {
            const appointmentNumber = slotInfo.scheduleIdentifier + '-' + slotInfo.nextAppointmentNumber;
            await appointmentModel.insertAppoint(userId, appointmentNumber, appointmentDTO, conn);
            await slotModel.incrementAppointmentCount(appointmentDTO.scheduleSlotId, conn);
            await conn.commit();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

module.exports = {
    isValidAppointmentTime,
    hasDuplicateAppointment,
    createAppointment,
};