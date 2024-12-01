const db = require('../db/db');

const AdminUsuarioModel = {
  // Listar todos os usuários com paginação
  getAllUsers: (page, limit, callback) => {
    const offset = (page - 1) * limit;
    const query = `SELECT id, nome, email, matricula, tipoUsuario FROM usuarios LIMIT ?, ?`;
    db.query(query, [offset, limit], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  // Contar o total de usuários
  getTotalUsers: (callback) => {
    db.query("SELECT COUNT(id) AS total FROM usuarios", (err, result) => {
      if (err) return callback(err, null);
      callback(null, result[0].total);
    });
  },

  // Inserir novo usuário
  insertUser: (name, email, password, matricula, tipoUsuario, callback) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return callback(err, null);
      const query = `INSERT INTO usuarios (nome, email, senha, matricula, tipoUsuario) VALUES (?, ?, ?, ?, ?)`;
      db.query(query, [name, email, hash, matricula, tipoUsuario], callback);
    });
  },

  // Excluir usuário por ID
  deleteUserById: (id, callback) => {
    const query = `DELETE FROM usuarios WHERE id = ?`;
    db.query(query, [id], callback);
  },
};

module.exports = AdminUsuarioModel;



