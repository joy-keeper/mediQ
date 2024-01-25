"use strict"

const ERROR_NAMES = {
    BAD_REQUEST: 'BadRequestError',
    UNAUTHORIZED: 'UnauthorizedError',
    FORBIDDEN: 'ForbiddenError',
    NOT_FOUND: 'NotFoundError',
    CONFLICT: 'ConflictError',
    INTERNAL_SERVER_ERROR: 'InternalServerError',
  };
  
  module.exports = ERROR_NAMES;