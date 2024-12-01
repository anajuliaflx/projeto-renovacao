const express = require("express");
const MensagemController = require("../controller/mensagemController");

const router = express.Router();

router.get("/mensagens/:tipoUsuario", MensagemController.listarMensagens);
router.post("/resposta", MensagemController.enviarResposta);

module.exports = router;
