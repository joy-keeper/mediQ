"use strict";

const appointmentService = require('../services/appointment-service');

const makeAppointment = async (req, res) => {
    const appointmentDTO = req.body;
    const userId = req.user.id;
    await appointmentService.createAppointment(userId, appointmentDTO);
    res.status(200).json({ message: "예약이 완료되었습니다." });
};

module.exports = {
    makeAppointment,
};
