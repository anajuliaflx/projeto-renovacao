const db = require("../db/db");

class Mensagem {
  static async contarMensagens(tipoUsuario) {
    const query = "SELECT COUNT(*) AS count FROM mensagens WHERE destinatario_tipo = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [tipoUsuario], (err, result) => {
        if (err) reject(err);
        else resolve(result[0].count);
      });
    });
  }

  static async buscarMensagens(tipoUsuario, limit, offset) {
    const query = `
      SELECT m.id, m.mensagem, m.data_envio, r.resposta, r.data_resposta, u.nome AS remetente_nome 
      FROM mensagens m
      LEFT JOIN respostas r ON m.id = r.mensagem_id
      JOIN usuarios u ON m.remetente_id = u.id
      WHERE m.destinatario_tipo = ?
      LIMIT ? OFFSET ?`;
    return new Promise((resolve, reject) => {
      db.query(query, [tipoUsuario, limit, offset], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async inserirResposta(mensagem_id, resposta, matricula, tipoUsuario) {
    const coluna = tipoUsuario === "psicologo" ? "matricula_psicologo" : "matricula_administrador";
    const query = `INSERT INTO respostas (mensagem_id, resposta, ${coluna}) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
      db.query(query, [mensagem_id, resposta, matricula], (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      });
    });
  }

  static async buscarDataResposta(respostaId) {
    const query = "SELECT data_resposta FROM respostas WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [respostaId], (err, result) => {
        if (err) reject(err);
        else resolve(result[0]?.data_resposta || null);
      });
    });
  }
}

module.exports = Mensagem;
