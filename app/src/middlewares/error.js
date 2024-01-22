"use strict"

module.exports = (err, req, res, next) => {  
  const statusCode = err.statusCode || 500;
  let message = err.message || '서버 내부 에러가 발생했습니다.'
  if (statusCode === 500) {
    console.error(err);
    message = '서버 내부 에러가 발생했습니다.';
  }
  res.status(statusCode).json({
    message: message
  });
};