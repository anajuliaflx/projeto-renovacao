const Mensagem = require("../model/mensagemModel");

class MensagemController {
  static async listarMensagens(req, res) {
    const tipoUsuario = req.params.tipoUsuario;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    if (!["administrador", "psicologo"].includes(tipoUsuario)) {
      return res.status(400).send({ msg: "Tipo de usuário inválido" });
    }

    try {
      const totalMessages = await Mensagem.contarMensagens(tipoUsuario);
      const totalPages = Math.ceil(totalMessages / limit);
      const messages = await Mensagem.buscarMensagens(tipoUsuario, limit, offset);
      res.send({ messages, totalPages });
    } catch (err) {
      console.error("Erro ao listar mensagens:", err);
      res.status(500).send({ msg: "Erro ao listar mensagens" });
    }
  }

  static async enviarResposta(req, res) {
    const { mensagem_id, resposta, matricula, tipoUsuario } = req.body;

    if (!mensagem_id || !resposta || !matricula || !tipoUsuario) {
      return res.status(400).send({ msg: "Todos os campos são obrigatórios" });
    }

    if (!["administrador", "psicologo"].includes(tipoUsuario)) {
      return res.status(400).send({ msg: "Tipo de usuário inválido" });
    }

    try {
      const respostaId = await Mensagem.inserirResposta(mensagem_id, resposta, matricula, tipoUsuario);
      const dataResposta = await Mensagem.buscarDataResposta(respostaId);

      if (!dataResposta) {
        return res.status(500).send({ msg: "Erro ao recuperar data da resposta" });
      }

      res.send({
        msg: "Resposta enviada com sucesso",
        data_resposta: dataResposta,
        resposta: resposta,
      });
    } catch (err) {
      console.error("Erro ao enviar resposta:", err);
      res.status(500).send({ msg: "Erro ao enviar resposta" });
    }
  }
}

module.exports = MensagemController;
