// server/models/User.js
const db = require("../db/db");

const Login = {
  findByEmail: (email, callback) => {
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], callback);
  },
  
  updateLoginStatus: (email, status, callback) => {
    db.query("UPDATE usuarios SET logged_in = ?, last_login = NOW() WHERE email = ?", [status, email], callback);
  },
  
  insert: (name, email, hashedPassword, matricula, tipoUsuario, callback) => {
    db.query(
      "INSERT INTO usuarios (nome, email, senha, matricula, tipoUsuario) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, matricula, tipoUsuario],
      callback
    );
  }
};

module.exports = Login;