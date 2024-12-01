const express = require('express');
const PsicoCronogramaRouter = express.Router();
const PsicoCronogramaController = require('../controller/psicoCronogramaController');

// Rota para listar eventos por psicólogo
PsicoCronogramaRouter.get("/eventos-psicologo/:matricula_psicologo", PsicoCronogramaController.listarEventosPorPsicologo);



module.exports = PsicoCronogramaRouter;
