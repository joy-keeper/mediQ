"use strict"

function convertToCamelCase(input) {
    if (Array.isArray(input)) {
        return input.map(convertToCamelCase);
    }

    let newObj = {};
    for (let key in input) {
        let camelCaseKey = key.toLowerCase().replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
        newObj[camelCaseKey] = input[key];
    }
    return newObj;
}

function convertToSnakeCase(input) {
    if (Array.isArray(input)) {
        return input.map(convertToSnakeCase);
    }

    let newObj = {};
    for (let key in input) {
        let snakeCaseKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        newObj[snakeCaseKey] = input[key];
    }
    return newObj;
}

module.exports = {
    convertToCamelCase,
    convertToSnakeCase,
};