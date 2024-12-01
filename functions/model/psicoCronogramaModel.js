const db = require('../db/db');

const PsicoCronogramaModel = {

  getEventosByPsicologo: (matriculaPsicologo) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM eventos WHERE matricula_psicologo = ?",
        [matriculaPsicologo],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
};

module.exports = PsicoCronogramaModel;
