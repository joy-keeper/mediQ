"use strict"

const { InternalServerError, AppError } = require('../utils/custom-error');

module.exports = (err, req, res, next) => {
  let error = err;
  if (!(err instanceof AppError)) { //예기치 못한 에러가 발생한 경우 -> 서버에러
    console.error(error);
    error = new InternalServerError();
  }
  res.status(error.statusCode).json({
    message: error.message
  });
};