const psicoAcompanhamentoModel = require("../model/psicoAcompanhamentoModel");

// Inserir avaliação
exports.createAvaliacao = (req, res) => {
  const data = req.body;

  // Validar e ajustar os dados
  if (!data.data_consulta || !data.matricula_aluno || !data.matricula_psicologo) {
    return res.status(400).send({ msg: "Campos obrigatórios estão ausentes" });
  }

  if (data.data_consulta) {
    data.data_consulta = new Date(data.data_consulta).toISOString().split("T")[0];
  }

  const booleanFields = [
    "expressao_sentimentos",
    "reconhecimento_impacto",
    "arrependimento",
    "identificacao_motivo",
  ];
  booleanFields.forEach((field) => {
    data[field] = data[field] === "Sim" ? 1 : 0;
  });

  psicoAcompanhamentoModel.insertAvaliacao(data, (err, result) => {
    if (err) {
      console.error("Erro ao inserir avaliação:", err);
      return res.status(500).send({ msg: "Erro ao salvar a avaliação. Tente novamente mais tarde." });
    }
    res.send({ msg: "Avaliação salva com sucesso" });
  });
};

// Obter alunos
exports.getAlunos = (req, res) => {
  psicoAcompanhamentoModel.getAlunos((err, result) => {
    if (err) {
      console.error("Erro ao buscar alunos:", err);
      return res.status(500).send({ msg: "Erro ao buscar alunos. Tente novamente mais tarde." });
    }
    res.send(result);
  });
};

// Obter eventos
exports.getEventos = (req, res) => {
  const { matricula_psicologo, matricula_aluno } = req.query;

  if (!matricula_psicologo || !matricula_aluno) {
    return res.status(400).send({ msg: "Matrícula do psicólogo e do aluno são obrigatórias." });
  }

  psicoAcompanhamentoModel.getEventos(matricula_psicologo, matricula_aluno, (err, result) => {
    if (err) {
      console.error("Erro ao buscar eventos:", err);
      return res.status(500).send({ msg: "Erro ao buscar eventos. Tente novamente mais tarde." });
    }
    res.send(result);
  });
};
