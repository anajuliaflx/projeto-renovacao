const express = require("express");
const AdminTrilhaRouter = express.Router();
const AdminTrilhaController = require("../controller/adminTrilhaController");

// Rota para adicionar uma trilha
AdminTrilhaRouter.post("/adicionar-trilha", AdminTrilhaController.addTrilha);

// Rota para adicionar um link
AdminTrilhaRouter.post("/adicionar-link", AdminTrilhaController.addLink);

module.exports = AdminTrilhaRouter;
