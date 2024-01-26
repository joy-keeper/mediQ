"use strict"

const HTTP_STATUS_CODES = require('../constants/httpStatusCodes');
const ERROR = require('../constants/error');

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class BadRequestError extends AppError {
    constructor(message = ERROR.BAD_REQUEST.MESSAGE) {
        super(message, HTTP_STATUS_CODES.BAD_REQUEST);
        this.name = ERROR.BAD_REQUEST.NAME;
    }
}

class UnauthorizedError extends AppError {
    constructor(message = ERROR.UNAUTHORIZED.MESSAGE) {
        super(message, HTTP_STATUS_CODES.UNAUTHORIZED);
        this.name = ERROR.UNAUTHORIZED.NAME;
    }
}

class ForbiddenError extends AppError {
    constructor(message = ERROR.FORBIDDEN.MESSAGE) {
        super(message, HTTP_STATUS_CODES.FORBIDDEN);
        this.name = ERROR.FORBIDDEN.NAME;
    }
}

class NotFoundError extends AppError {
    constructor(message = ERROR.NOT_FOUND.MESSAGE) {
        super(message, HTTP_STATUS_CODES.NOT_FOUND);
        this.name = ERROR.NOT_FOUND.NAME;
    }
}

class ConflictError extends AppError {
    constructor(message = ERROR.CONFLICT.MESSAGE) {
        super(message, HTTP_STATUS_CODES.CONFLICT);
        this.name = ERROR.CONFLICT.NAME;
    }
}

class InternalServerError extends AppError {
    constructor(message = ERROR.INTERNAL_SERVER_ERROR.MESSAGE) {
        super(message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        this.name = ERROR.INTERNAL_SERVER_ERROR.NAME;
    }
}

module.exports = {
    AppError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    InternalServerError
};