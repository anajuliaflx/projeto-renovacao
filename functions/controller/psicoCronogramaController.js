const PsicoCronogramaModel = require('../model/psicoCronogramaModel');

const PsicoCronogramaController = {

  listarEventosPorPsicologo: async (req, res) => {
    const { matricula_psicologo } = req.params;
    try {
      const eventos = await PsicoCronogramaModel.getEventosByPsicologo(matricula_psicologo);
      res.status(200).json(eventos);
    } catch (err) {
      res.status(500).send("Erro ao buscar eventos: " + err.message);
    }
  },

  };

module.exports = PsicoCronogramaController;
