"use strict"

const doctorService = require('../services/doctor-service');
const { OK } = require('../constants/httpStatusCodes');

const getSlotsList = async (req, res) => {
    const doctorId = req.params.doctorId;
    const date = req.query.date;
    const result = await doctorService.findSlotsByDate(doctorId, date); //빈 배열 일때도 정상 처리
    res.status(OK).json({
        message: '데이터를 성공적으로 불러왔습니다',
        data: result
    });
}

module.exports = {
    getSlotsList,
}
