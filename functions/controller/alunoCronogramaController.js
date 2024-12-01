// controllers/AlunoCronogramaController.js
const AlunoCronogramaModel = require('../model/alunoCronogramaModel');

const AlunoCronogramaController = {


  getEventosPorAluno: (req, res) => {
    const { matricula_aluno } = req.params;

    if (!matricula_aluno) {
      return res.status(400).json({ message: "Matrícula do aluno é obrigatória." });
    }

    AlunoCronogramaModel.getEventosPorAluno(matricula_aluno, (err, eventos) => {
      if (err) {
        res.status(500).json({ error: "Erro ao buscar eventos.", details: err });
      } else {
        res.json(eventos);
      }
    });
  },

  
};

module.exports = AlunoCronogramaController;
