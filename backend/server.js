const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const PORT = process.env.API_PORT;

const autoresRoutes = require("./routes/autoresRoute");
const livrosRoutes = require("./routes/livrosRoute");
const emprestimosRoutes = require("./routes/emprestimosRoute");
const generosRoutes = require("./routes/generosRoute");
const usuariosRoutes = require("./routes/usuariosRoute");

app.use(express.json());

app.use("/autores", autoresRoutes);
app.use("/livros", livrosRoutes);
app.use("/emprestimos", emprestimosRoutes);
app.use("/generos", generosRoutes);
app.use("/usuarios", usuariosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});