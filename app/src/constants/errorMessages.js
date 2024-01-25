"use strict"

const ERROR_MESSAGES = {
    BAD_REQUEST: '잘못된 요청입니다',
    UNAUTHORIZED: '인증이 필요합니다',
    FORBIDDEN: '권한이 없습니다',
    NOT_FOUND: '리소스를 찾을 수 없습니다',
    CONFLICT: '충돌이 발생했습니다',
    INTERNAL_SERVER_ERROR: '서버 내부 에러입니다',
};

module.exports = ERROR_MESSAGES;