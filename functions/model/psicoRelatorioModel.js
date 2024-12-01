const db = require('../db/db'); // Importa a configuração do banco de dados

// Modelo para buscar alunos
exports.getStudents = (callback) => {
  const query = "SELECT * FROM usuarios WHERE tipoUsuario = 'aluno'";
  db.query(query, callback);
};

// Modelo para buscar datas de eventos por matrícula
exports.getEventDatesByMatricula = (matricula, callback) => {
  const query = "SELECT DISTINCT data_consulta FROM avaliacoes WHERE matricula_aluno = ?";
  db.query(query, [matricula], callback);
};

// Modelo para buscar avaliações por matrícula
exports.getEvaluationsByMatricula = (matricula, callback) => {
  const query = `
    SELECT a.*, u.nome AS aluno_nome 
    FROM avaliacoes a 
    JOIN usuarios u ON a.matricula_aluno = u.matricula 
    WHERE a.matricula_aluno = ?
  `;
  db.query(query, [matricula], callback);
};
