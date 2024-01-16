"use strict";

const appointmentService = require('../services/appointment-service');

const makeAppointment = async (req, res) => {
    try {
        const appointmentDTO = req.body;
        const userId = req.user.id;
        const isValidSlot = await appointmentService.isValidAppointmentTime(appointmentDTO.scheduleSlotId);

        if (!isValidSlot) {
            return res.status(400).json({ message: "해당 시간대에 예약을 할 수 없습니다." });
        }
        const isDuplicateAppointment = await appointmentService.hasDuplicateAppointment(userId, appointmentDTO.scheduleSlotId);
        if (isDuplicateAppointment) {
            return res.status(409).json({ message: "해당 시간대에 예약이 존재합니다." });
        }
        const appointmentResult = appointmentService.createAppointment(userId, appointmentDTO);
        if (!appointmentResult) {
            return res.status(409).json({ message: "해당 시간대에 인원이 다 찼습니다." });
        }
        console.log("에약완료");
        res.status(200).json({ message: "예약이 완료되었습니다." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ meesage: "예약에 실패하였습니다." });
    }
};

module.exports = {
    makeAppointment,
};
