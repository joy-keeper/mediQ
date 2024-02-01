"use strict"

const ROLES = {
    USER: ['user'],
    HOSPITAL_MEMBER: ['staff', 'doctor', 'manager'],
    MANAGER: ['manager'],
    ADMIN: ['admin']
};

module.exports = ROLES;