// /models/TrocarSenhaModel.js
const db = require("../db/db");
const bcrypt = require("bcrypt");

const TrocarSenhaModel = {
  // Busca o usuário pela matrícula
  getUserByMatricula: (matricula, callback) => {
    db.query("SELECT * FROM usuarios WHERE matricula = ?", [matricula], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result[0]);
    });
  },

  // Atualiza a senha do usuário pela matrícula
  updatePasswordByMatricula: (matricula, newPassword, callback) => {
    bcrypt.hash(newPassword, 10, (err, hash) => {
      if (err) return callback(err);
      db.query("UPDATE usuarios SET senha = ? WHERE matricula = ?", [hash, matricula], callback);
    });
  },
};

module.exports = TrocarSenhaModel;
