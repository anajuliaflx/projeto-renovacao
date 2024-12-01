const AdminTrilhaModel = require("../model/adminTrilhaModel");

const AdminTrilhaController = {
  // Controlador para adicionar uma nova trilha
  addTrilha: (req, res) => {
    const { titulo, descricao, matricula_aluno } = req.body;

    if (!titulo || !descricao || !matricula_aluno || matricula_aluno.length !== 8) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios e a matrícula deve ter 8 caracteres" });
    }

    AdminTrilhaModel.addTrilha(titulo, descricao, matricula_aluno, (err, result) => {
      if (err) {
        console.error("Erro ao adicionar trilha:", err);
        return res.status(500).json({ msg: "Erro interno no servidor" });
      }
      res.status(201).json({ msg: "Trilha adicionada com sucesso", trilhaId: result.insertId });
    });
  },

  // Controlador para adicionar um link a uma trilha
  addLink: (req, res) => {
    const { url, titulo, descricao, trilha_id } = req.body;

    if (!url || !titulo || !descricao || !trilha_id) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
    }

    AdminTrilhaModel.addLink(url, titulo, descricao, trilha_id, (err, result) => {
      if (err) {
        console.error("Erro ao adicionar link:", err);
        return res.status(500).json({ msg: "Erro interno no servidor" });
      }
      res.status(201).json({ msg: "Link adicionado com sucesso" });
    });
  },
};

module.exports = AdminTrilhaController;
