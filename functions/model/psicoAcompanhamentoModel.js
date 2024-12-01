const db = require("../db/db");

// Inserir uma nova avaliação
exports.insertAvaliacao = (data, callback) => {
  db.query("INSERT INTO avaliacoes SET ?", data, callback);
};

// Obter alunos do banco de dados
exports.getAlunos = (callback) => {
  db.query("SELECT id, nome, matricula FROM usuarios WHERE tipoUsuario = 'aluno'", callback);
};

// Obter eventos relacionados a um psicólogo e aluno
exports.getEventos = (matriculaPsicologo, matriculaAluno, callback) => {
  db.query(
    "SELECT * FROM eventos WHERE matricula_psicologo = ? AND matricula_aluno = ?",
    [matriculaPsicologo, matriculaAluno],
    callback
  );
};
