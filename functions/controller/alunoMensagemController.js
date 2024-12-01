// src/controllers/messageController.js
const messageModel = require('../model/alunoMensagemModel');

// Controller para buscar mensagens e respostas
const getMessagesAndResponses = (req, res) => {
  const matricula = req.params.matricula;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Contar o número total de mensagens
  messageModel.countMessagesByMatricula(matricula, (err, countResult) => {
    if (err) {
      return res.status(500).send({ msg: 'Erro ao contar mensagens', error: err });
    }

    const totalMessages = countResult[0].count;
    const totalPages = Math.ceil(totalMessages / limit);

    // Buscar as mensagens e respostas
    messageModel.getMessagesWithResponses(matricula, limit, offset, (err, result) => {
      if (err) {
        return res.status(500).send({ msg: 'Erro ao buscar mensagens', error: err });
      }
      res.send({ messages: result, totalPages });
    });
  });
};

// Controller para buscar um usuário pela matrícula
const getUserByMatricula = (req, res) => {
  const matricula = req.params.matricula;

  messageModel.getUserByMatricula(matricula, (err, result) => {
    if (err) {
      return res.status(500).send({ msg: 'Erro ao buscar usuário', error: err });
    }
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send({ msg: "Usuário não encontrado" });
    }
  });
};

// Controller para enviar uma mensagem
const sendMessage = (req, res) => {
  const { remetente_id, destinatario_tipo, mensagem } = req.body;

  if (mensagem.length > 400) {
    return res.status(400).send({ msg: "A mensagem não pode ter mais de 400 caracteres" });
  }

  messageModel.sendMessage(remetente_id, destinatario_tipo, mensagem, (err, result) => {
    if (err) {
      return res.status(500).send({ msg: 'Erro ao enviar mensagem', error: err });
    }
    res.send({ msg: 'Mensagem enviada com sucesso' });
  });
};

module.exports = {
  getMessagesAndResponses,
  getUserByMatricula,
  sendMessage
};
