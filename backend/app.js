const express = require("express");

const app = express();

const autoresRoutes = require("./routes/autoresRoute");

app.use(express.json());

app.use(autoresRoutes);

module.exports = app;