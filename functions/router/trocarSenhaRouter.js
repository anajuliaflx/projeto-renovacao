// /routes/userRoutes.js
const express = require("express");
const TrocarSenhaController = require("../controller/trocarSenhaController");

const trocarSenhaRouter = express.Router();

// Rota para alterar a senha do usuário

trocarSenhaRouter.put("/trocarsenha", TrocarSenhaController.trocarSenha);

module.exports = trocarSenhaRouter;
