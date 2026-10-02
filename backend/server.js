const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.API_PORT;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});