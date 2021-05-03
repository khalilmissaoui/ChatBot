const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');
const indexRouter = require("./routes/index");
const courses = require("./routes/courses");
const report = require("./routes/report");
const auth = require("./routes/auth");
const register = require("./routes/register")
const scenario = require("./routes/scenario")
const userss = require("./routes/user")
require('dotenv').config()//** 







const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "build")));

app.use("/courses", courses);
app.use("/report", report);
app.use("/auth", auth);
app.use("/register",register)
app.use("/scenario",scenario)
app.use("/user", userss);
app.use("/", indexRouter);
app.use('/login', require('./routes/userRouter')); // **





app.get("*", (req, res) => {
  res.sendFile("build/index.html", { root: __dirname });
});



module.exports = app;
