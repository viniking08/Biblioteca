const express = require("express");

const app = express();

const autoresRoutes = require("./routes/autoresRoute");
const livrosRoutes = require("./routes/livrosRoute");
const emprestimosRoutes = require("./routes/emprestimosRoute");
const generosRoutes = require("./routes/generosRoute");
const usuariosRoutes = require("./routes/usuariosRoute");

app.use(express.json());

app.use(autoresRoutes);
app.use(livrosRoutes);
app.use(emprestimosRoutes);
app.use(generosRoutes);
app.use(usuariosRoutes);

module.exports = app;