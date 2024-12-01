const express = require('express');
const AdminCronogramaRouter = express.Router();
const AdminCronogramaController = require('../controller/adminCronogramaController');

// Rota para adicionar evento
AdminCronogramaRouter.post('/adicionar-evento', AdminCronogramaController.adicionarEvento);

module.exports = AdminCronogramaRouter;
