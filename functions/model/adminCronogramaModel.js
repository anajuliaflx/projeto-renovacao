const db = require('../db/db');

const AdminCronogramaModel = {
  adicionarEvento: (dataEvento, matriculaAluno, matriculaPsicologo, descricao) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO eventos (data_evento, matricula_aluno, matricula_psicologo, descricao) VALUES (?, ?, ?, ?)";
      db.query(query, [dataEvento, matriculaAluno, matriculaPsicologo, descricao], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  
};

module.exports = AdminCronogramaModel;
