"user strict"

const slotModel = require('../models/slot-model');

async function findSlotsByDate(doctorId, date) {
    let result = await slotModel.selectScheduleByDoctorIdAndDate(doctorId, date);
    result = result.map(row => {
        row.startTime = row.startTime.slice(0, 5);
        row.endTime = row.endTime.slice(0, 5);
        row.slotDate = row.slotDate.toISOString().split('T')[0];
        return row;
    });    
    return result;
}

module.exports = {
    findSlotsByDate,
}