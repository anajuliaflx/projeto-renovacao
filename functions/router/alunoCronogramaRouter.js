// routes/eventoRouter.js
const express = require('express');
const AlunoCronogramaRouter = express.Router();
const AlunoCronogramaController = require('../controller/alunoCronogramaController');

// Rota para listar eventos por aluno
AlunoCronogramaRouter.get('/eventos/:matricula_aluno', AlunoCronogramaController.getEventosPorAluno);

module.exports = AlunoCronogramaRouter;
