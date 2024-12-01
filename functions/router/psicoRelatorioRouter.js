const express = require('express');
const router = express.Router();
const PsicoRelatorioController = require('../controller/psicoRelatorioController');

// Rota para buscar todos os alunos
router.get('/filtrar-alunos', PsicoRelatorioController.getStudents);

// Rota para buscar datas de eventos por matrícula
router.get('/eventos-datas/:matricula', PsicoRelatorioController.getEventDatesByMatricula);

// Rota para buscar avaliações por aluno
router.get('/avaliacoes/:matricula_aluno', PsicoRelatorioController.getEvaluationsByMatricula);

module.exports = router;
