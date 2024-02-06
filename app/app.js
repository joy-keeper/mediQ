"use strict";

// 모듈
require('express-async-errors');
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require('cookie-parser');
const errorHandling = require("./src/middlewares/error");
dotenv.config();

// 라우팅
const viewRouter = require("./src/routes/view-router");
const userRouter = require("./src/routes/user-router");
const appointmentRouter = require("./src/routes/appointment-router");
const doctorRouter = require("./src/routes/doctor-router");
const searchRouter = require("./src/routes/search-router");

//앱 세팅
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/views", viewRouter);
app.use("/users", userRouter);
app.use("/appointments", appointmentRouter);
app.use("/doctors", doctorRouter);
app.use("/search", searchRouter);

app.use(errorHandling);
module.exports = app;