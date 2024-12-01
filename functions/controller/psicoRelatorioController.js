const PsicoRelatorioModel = require('../model/psicoRelatorioModel');

// Controlador para buscar alunos
exports.getStudents = (req, res) => {
  PsicoRelatorioModel.getStudents((err, result) => {
    if (err) {
      console.error("Erro ao filtrar alunos:", err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
};

// Controlador para buscar datas de eventos por matrícula
exports.getEventDatesByMatricula = (req, res) => {
  const { matricula } = req.params;
  PsicoRelatorioModel.getEventDatesByMatricula(matricula, (err, result) => {
    if (err) {
      console.error("Erro ao buscar datas de eventos:", err);
      return res.status(500).send(err);
    }
    res.send(result.map(r => r.data_consulta));
  });
};

// Controlador para buscar avaliações por matrícula
exports.getEvaluationsByMatricula = (req, res) => {
  const { matricula_aluno } = req.params;
  PsicoRelatorioModel.getEvaluationsByMatricula(matricula_aluno, (err, result) => {
    if (err) {
      console.error("Erro ao buscar avaliações:", err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
};
