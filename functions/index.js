const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/*const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "banco",
});*/

const db = mysql.createConnection({
    host: "dbrenovacao.cji8qsc8w257.us-east-1.rds.amazonaws.com",
    port:"3306",
    user: "admin",
    password: "renovdb7na",
    database: "dbrenovacao",
});

app.use(express.json());
app.use(cors());

db.connect(err=>{
  if(err){
      console.log(err.message);
      return;
  }
  console.log("Banco de dados conectado");
})

// Verificar se a tabela já existe
db.query("SHOW TABLES LIKE 'usuarios'", (err, result) => {
  if (err) {
      console.error("Erro ao verificar se a tabela existe:", err);
      return;
  }
  
  if (result.length === 0) {
      // A tabela não existe, então criamos
      db.query(`
          CREATE TABLE usuarios (
              id INT AUTO_INCREMENT PRIMARY KEY,
              nome VARCHAR(255),
              email VARCHAR(255) UNIQUE,
              senha VARCHAR(255),
              matricula VARCHAR(30),
              tipoUsuario VARCHAR(50)
          )
      `, (err, result) => {
          if (err) {
              console.error("Erro ao criar a tabela:", err);
              return;
          }
          console.log("Tabela 'usuarios' criada com sucesso");
      });
  } else {
      // A tabela já existe, então não fazemos nada
      console.log("A tabela 'usuarios' já existe");
  }
});

app.post("/cadastro", (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  const matricula = req.body.matricula;
  const tipoUsuario = req.body.tipoUsuario;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(senha, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO usuarios (nome, email, senha, matricula, tipoUsuario) VALUE (?,?,?,?,?)",
          [nome,email, hash, matricula, tipoUsuario],
          (error, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    } else if (result.length > 0) {
      bcrypt.compare(senha, result[0].senha, (error, response) => {
        if (error) {
          res.send(error);
        } else if (response) {
          res.send({ msg: "Usuário logado", tipoUsuario: result[0].tipoUsuario });
        } else {
          res.send({ msg: "Senha incorreta" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});
/*app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
*/
exports.api = onRequest(app);

//exports.api = functions.https.onRequest(app);
