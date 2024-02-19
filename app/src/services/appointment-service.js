"use strict"

const appointmentModel = require('../models/appointment-model');
const slotModel = require('../models/slot-model');
const pool = require('../config/db/mysql');
const { BadRequestError, ForbiddenError, NotFoundError, ConflictError } = require('../utils/custom-error');
const { filterValidKeys, convertDateToISOString } = require('../utils/util');
const ROLE = require('../constants/roles');

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
        const { slotMaxAppointments } = await slotModel.findSlotMaxAppointments(appointmentDTO.scheduleSlotId, conn);
        const currentAppointments = await appointmentModel.countConfirmedAppointmentsBySlotId(appointmentDTO.scheduleSlotId, conn, true);
        if (currentAppointments < slotMaxAppointments) {
            const appointmentNumber = await appointmentModel.getNextAppointmentNumber(appointmentDTO.scheduleSlotId, conn);
            await appointmentModel.insertAppointment(userId, appointmentNumber, appointmentDTO, conn);
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

async function modifyAppointmentStatus(user, appointmentId, status) {
    const appointment = await appointmentModel.findAppointmentById(appointmentId);
    if (!appointment) {
        throw new NotFoundError();
    }
    checkPermissionToModifyStatus(user, appointment, status);
    await appointmentModel.updateAppointmentStatus(appointmentId, status);
}

function checkPermissionToModifyStatus(user, appointment, status) {
    const isUser = ROLE.USER.includes(user.role);
    const isHospitalMember = ROLE.HOSPITAL_MEMBER.includes(user.role);
    if (appointment.status !== "confirmed") { //현재 예약 상태가 예약 완료가 아닌 경우
        throw new BadRequestError();
    }
    if (isUser) {
        if (appointment.userId !== user.id || status !== "cancelled") { //본인이 아니거나 취소 이외로 변경하려는 경우 , cancelled만 가능
            throw new ForbiddenError();
        }
    }
    else if (isHospitalMember) { //completed, absent 만 가능
        if (status === "cancelled") {
            throw new ForbiddenError();
        }
    }
}

async function getAppointmentsByUser(userId, status) {
    let appointments = [];
    if (status === "current") {
        appointments = await getCurrentAppointments(userId);
    } else if (status === "past") {
        appointments = await getPastAppointments(userId);
    } else {
        throw new BadRequestError();
    }
    return appointments;
}

async function getCurrentAppointments(userId) {
    let appointments = await appointmentModel.findConfirmedAppointments(userId);
    for (const appointment of appointments) {
        appointment.waitingCount = await getWaitingCount(appointment);
        appointment.slotDate = convertDateToISOString(appointment.slotDate);
    }
    return appointments;
}

async function getPastAppointments(userId) {
    let appointments = await appointmentModel.findNotConfirmedAppointments(userId);
    for (const appointment of appointments) {
        appointment.slotDate = convertDateToISOString(appointment.slotDate);
    }
    return appointments;
}

async function getWaitingCount(appointment) {
    const waitingNumSameSlot = await appointmentModel.getWaitingNumSameSlot(appointment.scheduleSlotId, appointment.appointmentNumber); // 해당 예약과 같은 슬롯내의 대기인원
    const waitingNumPrevSlot = await appointmentModel.getWaitingNumPrevSlots(appointment.doctorId, appointment.slotDate, appointment.startTime); // 해당 예약과 같은 날짜의 예약 중 자신보다 앞쪽 슬롯의 대기인원
    return waitingNumPrevSlot + waitingNumSameSlot;
}

module.exports = {
    isValidAppointmentTime,
    createAppointment,
    modifyAppointment,
    modifyAppointmentStatus,
    getAppointmentsByUser,
};