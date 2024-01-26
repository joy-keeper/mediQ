"use strict"

const ERROR_CONSTANTS = {
    BAD_REQUEST: {
        MESSAGE: '잘못된 요청입니다',
        NAME: 'BadRequestError'
    },
    UNAUTHORIZED: {
        MESSAGE: '인증이 필요합니다',
        NAME: 'UnauthorizedError'
    },
    FORBIDDEN: {
        MESSAGE: '권한이 없습니다',
        NAME: 'ForbiddenError'
    },
    NOT_FOUND: {
        MESSAGE: '리소스를 찾을 수 없습니다',
        NAME: 'NotFoundError'
    },
    CONFLICT: {
        MESSAGE: '충돌이 발생했습니다',
        NAME: 'ConflictError'
    },
    INTERNAL_SERVER_ERROR: {
        MESSAGE: '서버 내부 에러입니다',
        NAME: 'InternalServerError'
    },
};

module.exports = ERROR_CONSTANTS;