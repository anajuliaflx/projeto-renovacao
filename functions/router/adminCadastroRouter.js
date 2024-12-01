// routes/userRoutes.js
const express = require('express');
const AdminCadastroController = require('../controller/adminCadastroController');
const AdminCadastroRouter = express.Router();

AdminCadastroRouter.post('/admincadastro', AdminCadastroController.register);

module.exports = AdminCadastroRouter;
