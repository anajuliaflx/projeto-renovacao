// src/routes/trilhasRoutes.js
const express = require('express');
const alunoTrilhaController = require('../controller/alunoTrilhaController');

const alunoTrilhaRouter = express.Router();

// Rota para listar trilhas por matrícula de aluno
alunoTrilhaRouter.get('/trilhas/:matricula_aluno', alunoTrilhaController.listarTrilhas);

// Rota para listar links de uma trilha
alunoTrilhaRouter.get('/links/:trilha_id', alunoTrilhaController.listarLinks);

// Rota para marcar link como assistido
alunoTrilhaRouter.post('/marcar-assistido', alunoTrilhaController.marcarAssistido);

module.exports = alunoTrilhaRouter;
