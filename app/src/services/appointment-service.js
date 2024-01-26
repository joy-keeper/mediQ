"use strict"

const appointmentModel = require('../models/appointment-model');
const slotModel = require('../models/slot-model');
const pool = require('../config/db/mysql');
const { BadRequestError, ForbiddenError, NotFoundError, ConflictError } = require('../utils/custom-error');
const { filterValidKeys } = require('../utils/util');

const MINIMUM_TIME_BEFORE_APPOINTMENT = 30; // 예약 가능 최소 시간

async function isValidAppointmentTime(scheduleSlotId) {
    const result = await slotModel.findScheduleSlotWithMedicalScheduleById(scheduleSlotId);
    if (!result) {
        throw new NotFoundError();
    }
    const { slotDate, startTime } = result;
    const date = new Date(slotDate);
    const formatted_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const scheduleStart = new Date(formatted_date + ' ' + startTime);
    const now = new Date();
    now.setHours(now.getUTCHours() + 9); //한국 시간
    const diff = scheduleStart - now;
    if (diff >= MINIMUM_TIME_BEFORE_APPOINTMENT * 60 * 1000) { // 현재 시간으로부터 예약시간이 예약최소시간 이상인지 확인
        return;
    } else {
        throw new BadRequestError('해당 시간대에 예약을 할 수 없습니다');
    }
}

async function createAppointment(userId, appointmentDTO) {
    await isValidAppointmentTime(appointmentDTO.scheduleSlotId);
    const existingAppointment = await appointmentModel.findAppointmentByUserIdAndSlotId(userId, appointmentDTO.scheduleSlotId);
    if (existingAppointment) {
        throw new ConflictError('중복된 예약이 존재합니다');
    }
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const slotInfo = await slotModel.findScheduleSlotWithMedicalScheduleById(appointmentDTO.scheduleSlotId, conn);
        if (slotInfo.currentAppointments < slotInfo.maxAppointments) {
            const appointmentNumber = slotInfo.scheduleIdentifier + '-' + slotInfo.nextAppointmentNumber;
            await appointmentModel.insertAppointment(userId, appointmentNumber, appointmentDTO, conn);
            await slotModel.incrementAppointmentCount(appointmentDTO.scheduleSlotId, conn);
            await conn.commit();
            return true;
        } else {
            throw new ConflictError('해당 시간대에 인원이 다 찼습니다');
        }
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

async function modifyAppointment(user, appointmentId, updateData) {
    const validKeys = ['notes', 'type'];
    const filteredUpdateData = filterValidKeys(updateData, validKeys);
    if (Object.keys(updateData).length === 0 || filteredUpdateData === null) {
        throw new BadRequestError();
    }
    const appointment = await appointmentModel.findAppointmentById(appointmentId);
    if (!appointment) {
        throw new NotFoundError();
    }
    if (user.id !== appointment.userId) {
        throw new ForbiddenError();
    }
    await appointmentModel.updateAppointment(appointmentId, filteredUpdateData);
}

module.exports = {
    isValidAppointmentTime,
    createAppointment,
    modifyAppointment,
};