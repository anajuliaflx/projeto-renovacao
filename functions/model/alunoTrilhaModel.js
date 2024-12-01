// src/models/trilhasModel.js
const db = require('../db/db');

// Modelo para buscar trilhas por matrícula de aluno
const getTrilhasByMatricula = (matricula_aluno, callback) => {
  db.query(
    "SELECT * FROM trilhas WHERE matricula_aluno = ?",
    [matricula_aluno],
    callback
  );
};

// Modelo para buscar links de uma trilha
const getLinksByTrilhaId = (trilha_id, matricula_aluno, callback) => {
  db.query(
    "SELECT l.*, la.assistido FROM links l LEFT JOIN links_assistidos la ON l.id = la.link_id AND la.matricula_aluno = ? WHERE l.trilha_id = ?",
    [matricula_aluno, trilha_id],
    callback
  );
};

// Modelo para marcar link como assistido
const markLinkAsWatched = (link_id, matricula_aluno, callback) => {
  db.query(
    "INSERT INTO links_assistidos (link_id, matricula_aluno, assistido) VALUES (?, ?, TRUE) ON DUPLICATE KEY UPDATE assistido = TRUE",
    [link_id, matricula_aluno],
    callback
  );
};

// Exportando as funções
module.exports = {
  getTrilhasByMatricula,
  getLinksByTrilhaId,
  markLinkAsWatched,
};
