// src/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controller/alunoMensagemController');

// Rota para buscar mensagens e respostas
router.get('/mensagens-respostas/:matricula', messageController.getMessagesAndResponses);

// Rota para buscar um usuário pela matrícula
router.get('/usuario/:matricula', messageController.getUserByMatricula);

// Rota para enviar uma nova mensagem
router.post('/mensagem', messageController.sendMessage);

module.exports = router;
