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

/**
 * 주어진 데이터 객체(data)에서 유효한 키(validKeys)에 해당하는 속성만을 추출하여 새로운 객체를 생성하는 함수.
 * 만약 data 객체가 유효하지 않은 키를 포함하고 있다면, 함수는 null을 반환
 * 
 * @param {Object} data - 유효성을 검사할 데이터 객체
 * @param {Array} validKeys - 유효한 키 목록을 담은 배열
 * @return {Object|null} - 유효한 키에 해당하는 속성만을 가진 새로운 객체. 
 *                          만약 data가 유효하지 않은 키를 가지고 있다면 null을 반환
 */

function filterValidKeys(data, validKeys) {
    const dataKeys = Object.keys(data);
    const isValid = dataKeys.every(key => validKeys.includes(key));

    if (!isValid) {
        return null;
    }

    return validKeys.reduce((obj, key) => {
        if (data[key] !== undefined) {
            obj[key] = data[key];
        }
        return obj;
    }, {});
}

module.exports = {
    convertToCamelCase,
    convertToSnakeCase,
    filterValidKeys,
};