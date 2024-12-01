const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const db = require("./db/db");
require("./db/dbInitial"); // Importa para criar/verificar tabelas
require("./db/dbTable");       // Importa para inserir dados iniciais
const router = require("./router/loginRouter"); //router login
const adminUsuarioRouter = require("./router/adminUsuarioRouter"); //router admincadastro
const adminCadastroRouter = require("./router/adminCadastroRouter"); //router cadastro
const trocarSenhaRouter = require("./router/trocarSenhaRouter");
const adminTrilhaRouter = require("./router/adminTrilhaRouter"); //router adicionar trilha admin
const alunoTrilhaRouter = require("./router/alunoTrilhaRouter"); //router receber trilha aluno
const adminCronogramaRouter = require("./router/adminCronogramaRouter"); //router criar cronograma
const alunoCronogramaRouter = require("./router/alunoCronogramaRouter"); //router vizualizar cronograma
const psicoCronogramaRouter = require("./router/psicoCronogramaRouter"); //router vizualizar cronograma
const alunoMensagemRouter = require("./router/alunoMensagemRouter"); //router mensagem aluno
const mensagemRouter = require("./router/mensagemRouter"); //router mensagem admin e psico
const psicoAcompanhamentoRouter = require("./router/psicoAcompanhamentoRouter"); //router acompanhamento
const psicoRelatorioRouter = require("./router/psicoRelatorioRouter"); //router relatorio

console.log("Iniciando o servidor..."); // Log de depuração

const app = express();
app.use(express.json());
app.use(cors());

console.log("Importando rotas..."); // Log de depuração

app.use("/", router);//router login
app.use("/", adminUsuarioRouter); // Prefixo /api para as rotas de usuário / admincadastro
app.use("/api", adminCadastroRouter); // Prefixo /api para as rotas de usuário
app.use("/", trocarSenhaRouter);// prefixo do trocar senha
app.use("/", adminTrilhaRouter);// adicionar trilha admin
app.use("/", alunoTrilhaRouter);// adicionar trilha aluno
app.use("/", adminCronogramaRouter);// adicionar cronograma admin
app.use("/", alunoCronogramaRouter);// adicionar vizualizar cronograma
app.use("/", psicoCronogramaRouter);// adicionar vizualizar cronograma
app.use("/", alunoMensagemRouter);// mensagem aluno
app.use("/", mensagemRouter);// mensagem admin e psico
app.use("/", psicoAcompanhamentoRouter);// acompanhamento
app.use("/", psicoRelatorioRouter);// relatorio

/*// Importa e configura as rotas diretamente no app
require("./routes")(app);*/

exports.api = onRequest(app);