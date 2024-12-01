// server/controllers/authController.js
const bcrypt = require("bcrypt");
const Login = require("../model/loginModel");

const SESSION_TIMEOUT = 30 * 60 * 1000;

const login = (req, res) => {
  const { email, senha } = req.body;

  Login.findByEmail(email, (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).send({ msg: "Usuário não registrado!" });
    }

    const user = result[0];
    if (user.logged_in === 1) {
      const timeDiff = new Date().getTime() - new Date(user.last_login).getTime();
      if (timeDiff <= SESSION_TIMEOUT) {
        return res.status(403).send({ msg: "Usuário já está logado em outro dispositivo." });
      }
    }

    bcrypt.compare(senha, user.senha, (error, isValid) => {
      if (!isValid) return res.status(401).send({ msg: "Senha incorreta" });

      Login.updateLoginStatus(email, 1, (updateErr) => {
        if (updateErr) return res.status(500).send({ msg: "Erro ao atualizar o status de login." });

        res.send({
          msg: "Usuário logado com sucesso",
          tipoUsuario: user.tipoUsuario,
          matricula: user.matricula,
          nome: user.nome,
          email: user.email,
        });
      });
    });
  });
};

const logout = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ msg: "Email é obrigatório para deslogar." });
  }

  // Corrigindo a chamada para Login.updateLoginStatus
  Login.updateLoginStatus(email, 0, (err, result) => {
    if (err || result.affectedRows === 0) {
      return res.status(404).send({ msg: "Usuário não encontrado." });
    }
    res.status(200).send({ msg: "Logout bem-sucedido." });
  });
};


module.exports = { login, logout };
