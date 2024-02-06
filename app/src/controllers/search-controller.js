"use strict";

const searchModel = require('../models/search-model')

const searchKeyword = async (req, res) => {
    const keyword = req.query.input;
    const result = await searchModel.findHospitalName(keyword)
    
    if (!result) {
        throw new NotFoundError();
    }
    res.send(result)
};

module.exports = {
    searchKeyword
};