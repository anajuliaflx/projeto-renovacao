const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
require("./tables"); // Executa a criação das tabelas ao iniciar o servidor

console.log("Iniciando o servidor..."); // Log de depuração

const app = express();
app.use(express.json());
app.use(cors());

console.log("Importando rotas..."); // Log de depuração
// Importa e configura as rotas diretamente no app
require("./routes")(app);

exports.api = onRequest(app);