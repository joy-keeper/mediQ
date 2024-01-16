"use strict"

function convertToCamelCase(row) { //카멜케이스로 변환하는 함수
    let newObj = {};
    for (let key in row) {
        let camelCaseKey = key.toLowerCase().replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
        newObj[camelCaseKey] = row[key];
    }
    return newObj;
}

module.exports = {
    convertToCamelCase
};