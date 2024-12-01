// /controllers/AdminCadastroController.js
const AdminUsuarioModel = require("../model/adminUsuarioModel");

const AdminUsuarioController = {
  // Listar usuários com paginação
  getUsers: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    AdminUsuarioModel.getAllUsers(page, limit, (err, users) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar usuários" });
      
      AdminUsuarioModel.getTotalUsers((err, total) => {
        if (err) return res.status(500).json({ error: "Erro ao contar usuários" });
        
        res.json({
          users,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        });
      });
    });
  },

  // Criar novo usuário
  createUser: (req, res) => {
    const { name, email, password, matricula, tipoUsuario } = req.body;
    AdminUsuarioModel.insertUser(name, email, password, matricula, tipoUsuario, (err) => {
      if (err) return res.status(500).json({ error: "Erro ao criar usuário" });
      res.status(201).json({ message: "Usuário criado com sucesso" });
    });
  },

  // Excluir usuário
  deleteUser: (req, res) => {
    const { id } = req.params;
    AdminUsuarioModel.deleteUserById(id, (err) => {
      if (err) return res.status(500).json({ error: "Erro ao excluir usuário" });
      res.json({ message: "Usuário excluído com sucesso" });
    });
  },
};

module.exports = AdminUsuarioController;
