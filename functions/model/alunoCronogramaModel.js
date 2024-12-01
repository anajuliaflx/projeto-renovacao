// models/AlunoCronogramaModel.js
const db = require('../db/db'); // Importa a configuração do banco de dados

const AlunoCronogramaModel = {

  getEventosPorAluno: (matriculaAluno, callback) => {
    const query = "SELECT * FROM eventos WHERE matricula_aluno = ?";
    db.query(query, [matriculaAluno], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

  
};

module.exports = AlunoCronogramaModel;
