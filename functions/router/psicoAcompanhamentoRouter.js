const express = require("express");
const router = express.Router();
const psicoAcompanhamentoController = require("../controller/psicoAcompanhamentoController");

// Inserir uma avaliação
router.post("/avaliacao", psicoAcompanhamentoController.createAvaliacao);

// Obter lista de alunos
router.get("/filtrar-alunos", psicoAcompanhamentoController.getAlunos);

// Obter eventos
router.get("/eventos", psicoAcompanhamentoController.getEventos);

module.exports = router;
