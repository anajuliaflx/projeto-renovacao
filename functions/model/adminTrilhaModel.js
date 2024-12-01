const db = require('../db/db');

const AdminTrilhaModel = {
  // Model para adicionar uma trilha
  addTrilha: (titulo, descricao, matricula_aluno, callback) => {
    db.query(
      "INSERT INTO trilhas (titulo, descricao, matricula_aluno) VALUES (?, ?, ?)",
      [titulo, descricao, matricula_aluno],
      (err, result) => callback(err, result)
    );
  },

  // Model para adicionar um link
  addLink: (url, titulo, descricao, trilha_id, callback) => {
    db.query(
      "INSERT INTO links (url, titulo, descricao, trilha_id) VALUES (?, ?, ?, ?)",
      [url, titulo, descricao, trilha_id],
      (err, result) => callback(err, result)
    );
  },
};

module.exports = AdminTrilhaModel;
