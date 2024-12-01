// src/models/messageModel.js
const db = require('../db/db'); // Assume que db.js exporta uma instância do banco de dados

// Função para contar o número de mensagens
const countMessagesByMatricula = (matricula, callback) => {
  db.query(
    "SELECT COUNT(*) AS count FROM mensagens m JOIN usuarios u ON m.remetente_id = u.id WHERE u.matricula = ?",
    [matricula],
    callback
  );
};

// Função para buscar mensagens com respostas
const getMessagesWithResponses = (matricula, limit, offset, callback) => {
  db.query(
    "SELECT m.id AS mensagem_id, m.mensagem, m.data_envio, r.resposta, r.data_resposta, u.nome AS remetente_nome " +
    "FROM mensagens m " +
    "LEFT JOIN respostas r ON m.id = r.mensagem_id " +
    "JOIN usuarios u ON m.remetente_id = u.id " +
    "WHERE u.matricula = ? " +
    "LIMIT ? OFFSET ?",
    [matricula, limit, offset],
    callback
  );
};

// Função para buscar um usuário pela matrícula
const getUserByMatricula = (matricula, callback) => {
  db.query(
    "SELECT id FROM usuarios WHERE matricula = ?",
    [matricula],
    callback
  );
};

// Função para enviar uma nova mensagem
const sendMessage = (remetente_id, destinatario_tipo, mensagem, callback) => {
  db.query(
    "INSERT INTO mensagens (remetente_id, destinatario_tipo, mensagem) VALUES (?, ?, ?)",
    [remetente_id, destinatario_tipo, mensagem],
    callback
  );
};

module.exports = {
  countMessagesByMatricula,
  getMessagesWithResponses,
  getUserByMatricula,
  sendMessage
};
