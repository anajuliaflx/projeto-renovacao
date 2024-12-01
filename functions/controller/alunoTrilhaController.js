// src/controllers/trilhasController.js
const alunoTrilhaModel = require('../model/alunoTrilhaModel');

// Controlador para listar trilhas por matrícula de aluno
const listarTrilhas = (req, res) => {
  const { matricula_aluno } = req.params;

  if (matricula_aluno.length !== 8) {
    return res.status(400).send({ msg: "A matrícula deve ter exatamente 8 caracteres" });
  }

  alunoTrilhaModel.getTrilhasByMatricula(matricula_aluno, (err, result) => {
    if (err) {
      res.status(500).send({ msg: "Erro ao buscar trilhas", error: err });
    } else {
      res.status(200).send(result);
    }
  });
};

// Controlador para listar links de uma trilha
const listarLinks = (req, res) => {
  const { trilha_id } = req.params;
  const { matricula_aluno } = req.query;

  alunoTrilhaModel.getLinksByTrilhaId(trilha_id, matricula_aluno, (err, result) => {
    if (err) {
      res.status(500).send({ msg: "Erro ao buscar links", error: err });
    } else {
      res.status(200).send(result);
    }
  });
};

// Controlador para marcar link como assistido
const marcarAssistido = (req, res) => {
  const { link_id, matricula_aluno } = req.body;

  if (matricula_aluno.length !== 8) {
    return res.status(400).send({ msg: "A matrícula do aluno deve ter exatamente 8 caracteres" });
  }

  alunoTrilhaModel.markLinkAsWatched(link_id, matricula_aluno, (err) => {
    if (err) {
      res.status(500).send({ msg: "Erro ao marcar link como assistido", error: err });
    } else {
      res.status(200).send({ msg: "Link marcado como assistido" });
    }
  });
};

module.exports = {
  listarTrilhas,
  listarLinks,
  marcarAssistido,
};
