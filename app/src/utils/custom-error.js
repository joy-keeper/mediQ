"use strict"

const HTTP_STATUS_CODES = require('../constants/httpStatusCodes');
const ERROR_MESSAGES = require('../constants/errorMessages');
const ERROR_NAMES = require('../constants/errorNames');

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class BadRequestError extends AppError {
    constructor(message = ERROR_MESSAGES.BAD_REQUEST) {
        super(message, HTTP_STATUS_CODES.BAD_REQUEST);
        this.name = ERROR_NAMES.BAD_REQUEST;
    }
}

class UnauthorizedError extends AppError {
    constructor(message = ERROR_MESSAGES.UNAUTHORIZED) {
        super(message, HTTP_STATUS_CODES.UNAUTHORIZED);
        this.name = ERROR_NAMES.UNAUTHORIZED;
    }
}

class ForbiddenError extends AppError {
    constructor(message = ERROR_MESSAGES.FORBIDDEN) {
        super(message, HTTP_STATUS_CODES.FORBIDDEN);
        this.name = ERROR_NAMES.FORBIDDEN;
    }
}

class NotFoundError extends AppError {
    constructor(message = ERROR_MESSAGES.NOT_FOUND) {
        super(message, HTTP_STATUS_CODES.NOT_FOUND);
        this.name = ERROR_NAMES.NOT_FOUND;
    }
}

class ConflictError extends AppError {
    constructor(message = ERROR_MESSAGES.CONFLICT) {
        super(message, HTTP_STATUS_CODES.CONFLICT);
        this.name = ERROR_NAMES.CONFLICT;
    }
}

class InternalServerError extends AppError {
    constructor(message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR) {
        super(message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        this.name = ERROR_NAMES.INTERNAL_SERVER_ERROR;
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