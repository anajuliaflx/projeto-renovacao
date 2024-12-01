// /controllers/TrocarSenhaController.js
const TrocarSenhaModel = require("../model/trocarSenhaModel");
const bcrypt = require("bcrypt");

const TrocarSenhaController = {
  trocarSenha: (req, res) => {
    const { matricula, oldPassword, newPassword } = req.body;

    // Validação no servidor
    if (!matricula || matricula.length !== 8) {
      return res.status(400).json({ error: "A matrícula deve ter exatamente 8 caracteres." });
    }

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: "A nova senha deve ter pelo menos 8 caracteres." });
    }

    // Busca o usuário pela matrícula
    TrocarSenhaModel.getUserByMatricula(matricula, (err, user) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar usuário" });
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

      // Verifica se a senha antiga está correta
      bcrypt.compare(oldPassword, user.senha, (err, isMatch) => {
        if (err) return res.status(500).json({ error: "Erro ao verificar senha" });
        if (!isMatch) return res.status(401).json({ error: "Senha antiga incorreta" });

        // Atualiza a senha
        TrocarSenhaModel.updatePasswordByMatricula(matricula, newPassword, (err) => {
          if (err) return res.status(500).json({ error: "Erro ao atualizar senha" });
          res.json({ message: "Senha atualizada com sucesso." });
        });
      });
    });
  },
};

module.exports = TrocarSenhaController;
