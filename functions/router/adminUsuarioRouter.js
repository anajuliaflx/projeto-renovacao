// /routes/userRoutes.js
const express = require("express");
const AdminUsuarioController = require("../controller/adminUsuarioController");

const AdminUsuarioRouter = express.Router();

// Rota para listar usuários com paginação
AdminUsuarioRouter.get("/adminusuario", AdminUsuarioController.getUsers);


// Rota para excluir um usuário
AdminUsuarioRouter.delete("/adminusuario/:id", AdminUsuarioController.deleteUser);

module.exports = AdminUsuarioRouter;
