"use strict"

const doctorService = require('../services/doctor-service');

const getSlotsList = async (req, res) => {
    const doctorId = req.params.doctorId;
    const date = req.query.date;

    if (isNaN(doctorId) || isNaN(Date.parse(date))) {
        res.status(400).json({ message: '잘못된 요청입니다.' });
        return;
    }

    try {
        const result = await doctorService.findSlotsByDate(doctorId, date); //빈 배열 일때도 정상 처리
        res.status(200).json({
            message: '데이터를 성공적으로 불러왔습니다.',
            data: result
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '요청에 문제가 발생하였습니다.' });
    }
}

module.exports = {
    getSlotsList,
}
