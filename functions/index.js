const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "dbrenovacao.cji8qsc8w257.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "renovacaodb7na",
  database: "dbrenovacao",
});

/*const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});*/

db.connect(err => {
  if (err) {
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
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        matricula VARCHAR(8) UNIQUE NOT NULL,
        tipoUsuario VARCHAR(50) NOT NULL
      );`, (err, result) => {
      if (err) {
        console.error("Erro ao criar a tabela:", err);
        return;
      }
      console.log("Tabela 'usuarios' criada com sucesso");

      // Após criar a tabela, inserimos o usuário
      bcrypt.hash("admin1234", saltRounds, (error, hash) => {
        if (error) {
          console.error("Erro ao criptografar senha:", error);
          return;
        }
        db.query(`
          INSERT INTO usuarios (nome, email, senha, matricula, tipoUsuario)
          VALUES ("Administrador", "teste@gmail.com", ?, "11111111", "administrador");
        `, [hash], (err, result) => {
          if (err) {
            console.error("Erro ao inserir o usuário:", err);
            return;
          }
          console.log("Usuário inserido com sucesso");
        });
      });
    });
  } else {
    // A tabela já existe, então não fazemos nada
    console.log("A tabela 'usuarios' já existe");
  }
});

// Verificar se a tabela de mensagens já existe
db.query("SHOW TABLES LIKE 'mensagens'", (err, result) => {
  if (err) {
    console.error("Erro ao verificar se a tabela existe:", err);
    return;
  }
  if (result.length === 0) {
    // A tabela não existe, então criamos
    db.query(`
      CREATE TABLE mensagens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        remetente_id INT NOT NULL,
        destinatario_tipo ENUM('administrador', 'psicologo') NOT NULL,
        mensagem TEXT NOT NULL,
        data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (remetente_id) REFERENCES usuarios(id)
      );`, (err, result) => {
      if (err) {
        console.error("Erro ao criar a tabela:", err);
        return;
      }
      console.log("Tabela 'mensagens' criada com sucesso");
    });
  } else {
    console.log("A tabela 'mensagens' já existe");
  }
});

// Verificar se a tabela de mensagens já existe
db.query("SHOW TABLES LIKE 'respostas'", (err, result) => {
  if (err) {
    console.error("Erro ao verificar se a tabela existe:", err);
    return;
  }
  if (result.length === 0) {
    // A tabela não existe, então criamos
    // Criação da tabela 'respostas'
    db.query(`
  CREATE TABLE IF NOT EXISTS respostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mensagem_id INT NOT NULL,
    resposta TEXT NOT NULL,
    data_resposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mensagem_id) REFERENCES mensagens(id)
  );
`, (err, result) => {
      if (err) {
        console.error("Erro ao criar a tabela 'respostas':", err);
        return;
      }
      console.log("Tabela 'respostas' criada com sucesso");
    });
  } else {
    console.log("A tabela 'respostas' já existe");
  }
});

// Verificar se a tabela de eventos já existe
db.query("SHOW TABLES LIKE 'eventos'", (err, result) => {
  if (err) {
    console.error("Erro ao verificar se a tabela existe:", err);
    return;
  }

  if (result.length === 0) {
    // A tabela não existe, então criamos
    db.query(`
      CREATE TABLE eventos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        data_evento DATE NOT NULL,
        matricula_aluno VARCHAR(8) NOT NULL,
        matricula_psicologo VARCHAR(8) NOT NULL,
        descricao TEXT NOT NULL,
        FOREIGN KEY (matricula_aluno) REFERENCES usuarios(matricula),
        FOREIGN KEY (matricula_psicologo) REFERENCES usuarios(matricula)
      );`, (err, result) => {
      if (err) {
        console.error("Erro ao criar a tabela 'eventos':", err);
        return;
      }
      console.log("Tabela 'eventos' criada com sucesso");
    });
  } else {
    console.log("A tabela 'eventos' já existe");
  }
});

app.post("/admincadastro", (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  const matricula = req.body.matricula;
  const tipoUsuario = req.body.tipoUsuario;

  db.query("SELECT * FROM usuarios WHERE email = ? || matricula =?", [email, matricula], (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    else if (result.length > 0) {
      res.send({ msg: "Email ou matrícula já cadastrados" });
      return;
    }
    bcrypt.hash(senha, saltRounds, (error, hash) => {
      if (error) {
        res.send(error);
        return;
      }
      db.query(
        "INSERT INTO usuarios (nome, email, senha, matricula, tipoUsuario) VALUES (?,?,?,?,?)",
        [nome, email, hash, matricula, tipoUsuario],
        (error, response) => {
          if (error) {
            res.send(error);
            return;
          }
          res.send({ msg: "Usuário cadastrado com sucesso" });
        }
      );
    });
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
      return;
    } else if (result.length > 0) {
      bcrypt.compare(senha, result[0].senha, (error, response) => {
        if (error) {
          res.send(error);
          return;
        } else if (response) {
          res.send({
            msg: "Usuário logado",
            tipoUsuario: result[0].tipoUsuario,
            matricula: result[0].matricula, // Inclua a matrícula na resposta
          });
        } else {
          res.send({ msg: "Senha incorreta" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

// Rota para listar usuários com paginação
app.get("/adminusuario", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  db.query("SELECT COUNT(*) AS count FROM usuarios", (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    const totalUsers = result[0].count;
    const totalPages = Math.ceil(totalUsers / limit);

    db.query("SELECT * FROM usuarios LIMIT ? OFFSET ?", [limit, offset], (err, users) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.send({
        users,
        totalPages,
      });
    });
  });
});

// Rota para excluir um usuário
app.delete("/adminusuario/:id", (req, res) => {
  const userId = req.params.id;

  db.query("DELETE FROM usuarios WHERE id = ?", [userId], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.send({ msg: "Usuário excluído com sucesso" });
  });
});

app.post("/mensagem", (req, res) => {
  const remetente_id = req.body.remetente_id;
  const destinatario_tipo = req.body.destinatario_tipo;
  const mensagem = req.body.mensagem;

  if (mensagem.length > 400) {
    res.status(400).send({ msg: "A mensagem não pode ter mais de 400 caracteres" });
    return;
  }

  db.query(
    "INSERT INTO mensagens (remetente_id, destinatario_tipo, mensagem) VALUES (?, ?, ?)",
    [remetente_id, destinatario_tipo, mensagem],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.send({ msg: "Mensagem enviada com sucesso" });
    }
  );
});

app.get("/usuario/:matricula", (req, res) => {
  const matricula = req.params.matricula;

  db.query("SELECT id FROM usuarios WHERE matricula = ?", [matricula], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send({ msg: "Usuário não encontrado" });
    }
  });
});

// Rota para enviar uma resposta
app.post("/resposta/:tipoUsuario", (req, res) => {
  const { tipoUsuario } = req.params;
  const { mensagem_id, resposta, matricula } = req.body;

  if (!mensagem_id || !resposta || !matricula) {
    return res.status(400).send({ msg: "Todos os campos são obrigatórios" });
  }

  let query;
  if (tipoUsuario === 'psicologo') {
    query = "INSERT INTO respostas (mensagem_id, resposta, matricula_psicologo) VALUES (?, ?, ?)";
  } else if (tipoUsuario === 'administrador') {
    query = "INSERT INTO respostas (mensagem_id, resposta, matricula_administrador) VALUES (?, ?, ?)";
  } else {
    return res.status(400).send({ msg: "Tipo de usuário inválido" });
  }

  db.query(
    query,
    [mensagem_id, resposta, matricula],
    (err, result) => {
      if (err) {
        console.error("Erro ao enviar resposta:", err);
        return res.status(500).send({ msg: "Erro ao enviar resposta" });
      }
      db.query(
        "SELECT data_resposta FROM respostas WHERE id = ?",
        [result.insertId],
        (err, data) => {
          if (err) {
            console.error("Erro ao recuperar data da resposta:", err);
            return res.status(500).send({ msg: "Erro ao recuperar data da resposta" });
          }
          res.send({
            msg: "Resposta enviada com sucesso",
            data_resposta: data[0].data_resposta,
            resposta: resposta
          });
        }
      );
    }
  );
});

app.get("/mensagens/:tipoUsuario", (req, res) => {
  const tipoUsuario = req.params.tipoUsuario;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  if (!['administrador', 'psicologo'].includes(tipoUsuario)) {
    return res.status(400).send({ msg: "Tipo de usuário inválido" });
  }

  db.query(
    "SELECT COUNT(*) AS count FROM mensagens WHERE destinatario_tipo = ?",
    [tipoUsuario],
    (err, countResult) => {
      if (err) {
        console.error("Erro ao contar mensagens:", err);
        return res.status(500).send({ msg: "Erro ao contar mensagens" });
      }

      const totalMessages = countResult[0].count;
      const totalPages = Math.ceil(totalMessages / limit);

      db.query(
        "SELECT m.id, m.mensagem, m.data_envio, r.resposta, r.data_resposta, u.nome AS remetente_nome " +
        "FROM mensagens m " +
        "LEFT JOIN respostas r ON m.id = r.mensagem_id " +
        "JOIN usuarios u ON m.remetente_id = u.id " +
        "WHERE m.destinatario_tipo = ? " +
        "LIMIT ? OFFSET ?",
        [tipoUsuario, limit, offset],
        (err, result) => {
          if (err) {
            console.error("Erro ao buscar mensagens:", err);
            return res.status(500).send({ msg: "Erro ao buscar mensagens" });
          }
          res.send({ messages: result, totalPages });
        }
      );
    }
  );
});

// Rota para obter respostas para as mensagens do aluno
app.get("/mensagens-respostas/:matricula", (req, res) => {
  const matricula = req.params.matricula;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  db.query(
    "SELECT COUNT(*) AS count FROM mensagens m JOIN usuarios u ON m.remetente_id = u.id WHERE u.matricula = ?",
    [matricula],
    (err, countResult) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      const totalMessages = countResult[0].count;
      const totalPages = Math.ceil(totalMessages / limit);

      db.query(
        "SELECT m.id AS mensagem_id, m.mensagem, m.data_envio, r.resposta, r.data_resposta, u.nome AS remetente_nome " +
        "FROM mensagens m " +
        "LEFT JOIN respostas r ON m.id = r.mensagem_id " +
        "JOIN usuarios u ON m.remetente_id = u.id " +
        "WHERE u.matricula = ? " +
        "LIMIT ? OFFSET ?",
        [matricula, limit, offset],
        (err, result) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          res.send({ messages: result, totalPages });
        }
      );
    }
  );
});

app.post("/adicionar-evento", (req, res) => {
  const { data_evento, matricula_aluno, matricula_psicologo, descricao } = req.body;

  if (!data_evento || !matricula_aluno || !matricula_psicologo || !descricao) {
    return res.status(400).send({ msg: "Todos os campos são obrigatórios" });
  }

  if (matricula_aluno.length !== 8 || matricula_psicologo.length !== 8) {
    return res.status(400).send({ msg: "Matrícula do aluno e do psicólogo deve ter exatamente 8 caracteres" });
  }

  db.query(
    "INSERT INTO eventos (data_evento, matricula_aluno, matricula_psicologo, descricao) VALUES (?, ?, ?, ?)",
    [data_evento, matricula_aluno, matricula_psicologo, descricao],
    (err, result) => {
      if (err) {
        console.error("Erro ao adicionar evento:", err);
        res.status(500).send({ msg: "Erro ao adicionar evento" });
        return;
      }
      res.send({ msg: "Evento adicionado com sucesso" });
    }
  );
});

// Listar eventos por aluno
app.get("/eventos/:matricula_aluno", (req, res) => {
  const matricula_aluno = req.params.matricula_aluno;
  db.query(
    "SELECT * FROM eventos WHERE matricula_aluno = ?",
    [matricula_aluno],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.send(result);
    }
  );
});
// Listar eventos por psicólogo
app.get("/eventos-psicologo/:matricula_psicologo", (req, res) => {
  const matricula_psicologo = req.params.matricula_psicologo;
  db.query(
    "SELECT * FROM eventos WHERE matricula_psicologo = ?",
    [matricula_psicologo],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.send(result);
    }
  );
});

/*app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
*/

exports.api = onRequest(app);

//exports.api = functions.https.onRequest(app);