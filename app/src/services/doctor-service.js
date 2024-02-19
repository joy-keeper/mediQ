"user strict"

const slotModel = require('../models/slot-model');
const appointmentModel = require('../models/appointment-model');
const { convertDateToISOString } = require('../utils/util');

async function findSlotsByDate(doctorId, date) {
    let result = await slotModel.selectScheduleByDoctorIdAndDate(doctorId, date);
    for (let row of result) {
        row.startTime = row.startTime.slice(0, 5);
        row.endTime = row.endTime.slice(0, 5);
        row.slotDate = convertDateToISOString(row.slotDate)
        row.currentAppointments = await appointmentModel.countConfirmedAppointmentsBySlotId(row.scheduleSlotId);
    }
    return result;
}

module.exports = {
    findSlotsByDate,
}