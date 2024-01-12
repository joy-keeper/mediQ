"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require('cookie-parser');
dotenv.config();

// 라우팅
const viewRouter = require("./src/routes/view-router");
const userRouter = require("./src/routes/user-router");

//앱 세팅
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/views", viewRouter);
app.use("/users", userRouter);

module.exports = app;