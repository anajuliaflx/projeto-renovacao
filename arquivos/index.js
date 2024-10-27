/*const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const db = require("./db"); // Conexão com o banco de dados
const router = require("./router"); // Rotas definidas

const app = express();
app.use(express.json());

// Configuração de CORS - ajuste para o domínio do seu frontend em produção
app.use(cors({ origin: true })); // ou substitua por um domínio específico

// Usa as rotas definidas
app.use("/", router);

// Exporta a aplicação Express para Firebase Functions
exports.api = onRequest(app);*/