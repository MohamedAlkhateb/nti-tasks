require("../models/dbCon");
const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../frontend/views"));
hbs.registerPartials(path.join(__dirname, "../frontend/layouts"));
app.use(express.urlencoded({ extended: true }));
const bankRoutes = require("../routes/bank.routes");
app.use(bankRoutes);

app.get("*", (req, res) => res.send("page not found"));

module.exports = app;
