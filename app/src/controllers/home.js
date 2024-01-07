"use strict";

const output = {
    home: (req, res) => {
        console.log("홈화면으로 이동");
        res.render("home/index");
    },
};

const process = {
};

module.exports = {
    output,
    process,
};
