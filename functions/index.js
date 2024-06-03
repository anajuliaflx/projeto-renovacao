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
  host: process.env.DB_HOST || "dbrenovacao.cji8qsc8w257.us-east-1.rds.amazonaws.com",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "renovacaodb7na",
  database: process.env.DB_DATABASE || "dbrenovacao",
});

db.connect(err => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Banco de dados conectado");
});

// Função para inserir usuários
const insertUser = (name, email, password, matricula, tipoUsuario) => {
  bcrypt.hash(password, saltRounds, (error, hash) => {
    if (error) {
      console.error("Erro ao criptografar senha:", error);
      return;
    }
    db.query(`
      INSERT INTO usuarios (nome, email, senha, matricula, tipoUsuario)
      VALUES (?, ?, ?, ?, ?);
    `, [name, email, hash, matricula, tipoUsuario], (err, result) => {
      if (err) {
        console.error(`Erro ao inserir o usuário '${name}':`, err);
        return;
      }
      console.log(`Usuário '${name}' inserido com sucesso`);
    });
  });
};

// Função de callback para inserção de usuários após a criação da tabela
const insertUsers = () => {
  insertUser("Admin", "admin@gmail.com", "admin1234", "11111111", "administrador");
  insertUser("Aluno", "aluno@gmail.com", "aluno1234", "22222222", "aluno");
  insertUser("Psico", "psico@gmail.com", "psico1234", "33333333", "psicologo");
};

// Função para verificar se a tabela existe e, caso contrário, criá-la
const verifyAndCreateTable = (tableName, createTableQuery, callback = null) => {
  db.query(`SHOW TABLES LIKE '${tableName}'`, (err, result) => {
    if (err) {
      console.error(`Erro ao verificar se a tabela ${tableName} existe:`, err);
      return;
    }
    if (result.length === 0) {
      db.query(createTableQuery, (err, result) => {
        if (err) {
          console.error(`Erro ao criar a tabela ${tableName}:`, err);
          return;
        }
        console.log(`Tabela '${tableName}' criada com sucesso`);
        if (callback) callback(); // Chame a função callback após criar a tabela, se houver
      });
    } else {
      console.log(`A tabela '${tableName}' já existe`);
      if (callback) callback(); // Chame a função callback se a tabela já existir, se houver
    }
  });
};

// Verificar e criar tabelas se não existirem
verifyAndCreateTable('usuarios', `
  CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    matricula VARCHAR(8) UNIQUE NOT NULL,
    tipoUsuario VARCHAR(50) NOT NULL
  );
`, insertUsers);

verifyAndCreateTable('mensagens', `
  CREATE TABLE mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    remetente_id INT NOT NULL,
    destinatario_tipo ENUM('administrador', 'psicologo') NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (remetente_id) REFERENCES usuarios(id)
  );
`);

verifyAndCreateTable('respostas', `
  CREATE TABLE respostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mensagem_id INT NOT NULL,
    resposta TEXT NOT NULL,
    data_resposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    matricula_psicologo VARCHAR(8),
    matricula_administrador VARCHAR(8),
    FOREIGN KEY (mensagem_id) REFERENCES mensagens(id)
  );
`);

verifyAndCreateTable('eventos', `
  CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_evento DATE NOT NULL,
    matricula_aluno VARCHAR(8) NOT NULL,
    matricula_psicologo VARCHAR(8) NOT NULL,
    descricao TEXT NOT NULL,
    FOREIGN KEY (matricula_aluno) REFERENCES usuarios(matricula),
    FOREIGN KEY (matricula_psicologo) REFERENCES usuarios(matricula)
  );
`);

verifyAndCreateTable('trilhas', `
  CREATE TABLE trilhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    matricula_aluno VARCHAR(8) NOT NULL,
    FOREIGN KEY (matricula_aluno) REFERENCES usuarios(matricula)
  );
`);

verifyAndCreateTable('links', `
  CREATE TABLE links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    trilha_id INT NOT NULL,
    FOREIGN KEY (trilha_id) REFERENCES trilhas(id)
  );
`);

verifyAndCreateTable('links_assistidos', `
  CREATE TABLE links_assistidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    link_id INT NOT NULL,
    matricula_aluno VARCHAR(8) NOT NULL,
    assistido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (link_id) REFERENCES links(id),
    FOREIGN KEY (matricula_aluno) REFERENCES usuarios(matricula)
  );
`);

verifyAndCreateTable('notificacoes', `
  CREATE TABLE notificacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mensagem TEXT NOT NULL,
    matricula_admin VARCHAR(8) NOT NULL,
    titulo_trilha VARCHAR(255) NOT NULL,
    data_notificacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (matricula_admin) REFERENCES usuarios(matricula)
  );
`);

verifyAndCreateTable('avaliacoes', `
  CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula_aluno VARCHAR(8) NOT NULL,
    matricula_psicologo VARCHAR(8) NOT NULL,
    data_consulta DATE NOT NULL,
    estado_emocional ENUM('Muito Triste', 'Triste', 'Neutro', 'Feliz', 'Muito Feliz') NOT NULL,
    sinais_ansiedade BOOLEAN NOT NULL,
    descricao_ansiedade TEXT,
    comportamento ENUM('Muito Cooperativo', 'Cooperativo', 'Neutro', 'Não Cooperativo', 'Muito Não Cooperativo') NOT NULL,
    expressao_sentimentos BOOLEAN NOT NULL,
    dificuldades_expressao TEXT,
    reconhecimento_impacto BOOLEAN NOT NULL,
    explicacao_impacto TEXT,
    arrependimento BOOLEAN NOT NULL,
    forma_arrependimento TEXT,
    identificacao_motivo BOOLEAN NOT NULL,
    explicacao_motivo TEXT,
    estrategias ENUM('Aumentar a comunicação', 'Monitorar o comportamento online', 'Educação sobre ciberbullying', 'Outras') NOT NULL,
    descricao_estrategias TEXT,
    disposto_a_implementar BOOLEAN NOT NULL,
    metas ENUM('Melhorar a comunicação', 'Reduzir o uso de redes sociais', 'Participar de sessões de aconselhamento', 'Outras') NOT NULL,
    descricao_metas TEXT,
    progresso_metas ENUM('Não começou', 'Em progresso', 'Quase concluído', 'Concluído') NOT NULL,
    detalhes_progresso TEXT,
    observacoes TEXT,
    avaliacao_geral ENUM('Muito Insatisfatório', 'Insatisfatório', 'Neutro', 'Satisfatório', 'Muito Satisfatório') NOT NULL,
    comentarios TEXT,
    FOREIGN KEY (matricula_aluno) REFERENCES usuarios(matricula),
    FOREIGN KEY (matricula_psicologo) REFERENCES usuarios(matricula)
  );
`);


// Rotas para CRUD de usuários e autenticação
app.post("/admincadastro", (req, res) => {
  const { nome, email, senha, matricula, tipoUsuario } = req.body;

  db.query("SELECT * FROM usuarios WHERE email = ? OR matricula = ?", [email, matricula], (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    if (result.length > 0) {
      res.send({ msg: "Email ou matrícula já cadastrados" });
      return;
    }
    bcrypt.hash(senha, saltRounds, (error, hash) => {
      if (error) {
        res.send(error);
        return;
      }
      db.query(
        "INSERT INTO usuarios (nome, email, senha, matricula, tipoUsuario) VALUES (?, ?, ?, ?, ?)",
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
  const { email, senha } = req.body;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    if (result.length > 0) {
      bcrypt.compare(senha, result[0].senha, (error, response) => {
        if (error) {
          res.send(error);
          return;
        }
        if (response) {
          res.send({
            msg: "Usuário logado",
            tipoUsuario: result[0].tipoUsuario,
            matricula: result[0].matricula,
            nome: result[0].nome, // Incluindo o nome no response
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

// Rota para obter ID de um usuário por matrícula
app.get("/adminusuario/:matricula", (req, res) => {
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

// Rota para enviar mensagem
app.post("/mensagem", (req, res) => {
  const { remetente_id, destinatario_tipo, mensagem } = req.body;

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


// Rota para obter mensagens por tipo de usuário com paginação
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

// Rota para enviar uma resposta
app.post("/resposta", (req, res) => {
  const { mensagem_id, resposta, matricula, tipoUsuario } = req.body;

  if (!mensagem_id || !resposta || !matricula || !tipoUsuario) {
    console.error("Campos obrigatórios faltando:", { mensagem_id, resposta, matricula, tipoUsuario });
    return res.status(400).send({ msg: "Todos os campos são obrigatórios" });
  }

  let query;
  if (tipoUsuario === 'psicologo') {
    query = "INSERT INTO respostas (mensagem_id, resposta, matricula_psicologo) VALUES (?, ?, ?)";
  } else if (tipoUsuario === 'administrador') {
    query = "INSERT INTO respostas (mensagem_id, resposta, matricula_administrador) VALUES (?, ?, ?)";
  } else {
    console.error("Tipo de usuário inválido:", tipoUsuario);
    return res.status(400).send({ msg: "Tipo de usuário inválido" });
  }

  db.query(query, [mensagem_id, resposta, matricula], (err, result) => {
    if (err) {
      console.error("Erro ao enviar resposta:", err);
      return res.status(500).send({ msg: "Erro ao enviar resposta" });
    }

    // Verificar se a resposta foi inserida corretamente
    const insertId = result.insertId;
    if (!insertId) {
      console.error("Erro ao obter o ID inserido.");
      return res.status(500).send({ msg: "Erro ao enviar resposta" });
    }

    db.query(
      "SELECT data_resposta FROM respostas WHERE id = ?",
      [insertId],
      (err, data) => {
        if (err) {
          console.error("Erro ao recuperar data da resposta:", err);
          return res.status(500).send({ msg: "Erro ao recuperar data da resposta" });
        }

        if (data.length === 0) {
          console.error("Nenhuma data de resposta encontrada para o ID:", insertId);
          return res.status(500).send({ msg: "Erro ao recuperar data da resposta" });
        }

        res.send({
          msg: "Resposta enviada com sucesso",
          data_resposta: data[0].data_resposta,
          resposta: resposta
        });
      }
    );
  });
});


// Rota para adicionar evento
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

app.get("/eventos", (req, res) => {
  const { matricula_psicologo, matricula_aluno } = req.query;
  db.query("SELECT * FROM eventos WHERE matricula_psicologo = ? AND matricula_aluno = ?", [matricula_psicologo, matricula_aluno], (err, result) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.send(result);
      }
  });
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

// Rota para adicionar trilha
app.post("/adicionar-trilha", (req, res) => {
  const { titulo, descricao, matricula_aluno } = req.body;

  if (matricula_aluno.length !== 8) {
    return res.status(400).send({ msg: "A matrícula do aluno deve ter exatamente 8 caracteres" });
  }

  db.query(
    "INSERT INTO trilhas (titulo, descricao, matricula_aluno) VALUES (?, ?, ?)",
    [titulo, descricao, matricula_aluno],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.send({ msg: "Trilha adicionada com sucesso", trilhaId: result.insertId });
    }
  );
});

// Rota para adicionar link a uma trilha
app.post("/adicionar-link", (req, res) => {
  const { url, titulo, descricao, trilha_id } = req.body;

  db.query(
    "INSERT INTO links (url, titulo, descricao, trilha_id) VALUES (?, ?, ?, ?)",
    [url, titulo, descricao, trilha_id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.send({ msg: "Link adicionado com sucesso" });
    }
  );
});

// Rota para marcar link como assistido
app.post("/marcar-assistido", (req, res) => {
  const { link_id, matricula_aluno } = req.body;

  if (matricula_aluno.length !== 8) {
    return res.status(400).send({ msg: "A matrícula do aluno deve ter exatamente 8 caracteres" });
  }

  db.query(
    "INSERT INTO links_assistidos (link_id, matricula_aluno, assistido) VALUES (?, ?, TRUE) ON DUPLICATE KEY UPDATE assistido = TRUE",
    [link_id, matricula_aluno],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      // Verifica se todos os links da trilha foram assistidos
      db.query(
        "SELECT COUNT(*) AS total_links FROM links WHERE trilha_id = (SELECT trilha_id FROM links WHERE id = ?)",
        [link_id],
        (err, totalLinksResult) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          const totalLinks = totalLinksResult[0].total_links;

          db.query(
            "SELECT COUNT(*) AS assistidos FROM links_assistidos WHERE link_id IN (SELECT id FROM links WHERE trilha_id = (SELECT trilha_id FROM links WHERE id = ?)) AND matricula_aluno = ? AND assistido = TRUE",
            [link_id, link_id, matricula_aluno],
            (err, assistidosResult) => {
              if (err) {
                res.status(500).send(err);
                return;
              }
              const assistidos = assistidosResult[0].assistidos;

              if (totalLinks === assistidos) {
                // Obter o título da trilha
                db.query(
                  "SELECT t.titulo FROM trilhas t JOIN links l ON t.id = l.trilha_id WHERE l.id = ?",
                  [link_id],
                  (err, trilhaResult) => {
                    if (err) {
                      res.status(500).send(err);
                      return;
                    }
                    const titulo_trilha = trilhaResult[0].titulo;

                    // Enviar notificação para o administrador
                    const mensagem = `Todos os links da trilha "${titulo_trilha}" foram assistidos pelo aluno ${matricula_aluno}.`;
                    db.query(
                      "INSERT INTO notificacoes (mensagem, matricula_aluno, titulo_trilha) VALUES (?, ?, ?)",
                      [mensagem, matricula_aluno, titulo_trilha],
                      (err, result) => {
                        if (err) {
                          res.status(500).send(err);
                          return;
                        }
                        res.send({ msg: "Link marcado como assistido. Todos os links da trilha foram assistidos." });
                      }
                    );
                  }
                );
              } else {
                res.send({ msg: "Link marcado como assistido" });
              }
            }
          );
        }
      );
    }
  );
});

// Listar trilhas por aluno
app.get("/trilhas/:matricula_aluno", (req, res) => {
  const matricula_aluno = req.params.matricula_aluno;

  if (matricula_aluno.length !== 8) {
    return res.status(400).send({ msg: "A matrícula deve ter exatamente 8 caracteres" });
  }

  db.query(
    "SELECT * FROM trilhas WHERE matricula_aluno = ?",
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

// Listar links de uma trilha
app.get("/links/:trilha_id", (req, res) => {
  const trilha_id = req.params.trilha_id;
  const matricula_aluno = req.query.matricula_aluno;

  db.query(
    "SELECT l.*, la.assistido FROM links l LEFT JOIN links_assistidos la ON l.id = la.link_id AND la.matricula_aluno = ? WHERE l.trilha_id = ?",
    [matricula_aluno, trilha_id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.send(result);
    }
  );
});

// Listar notificações
app.get("/notificacoes", (req, res) => {
  db.query(
    "SELECT * FROM notificacoes",
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.send(result);
    }
  );
});

// Filtrando apenas alunos
app.get("/filtrar-alunos", (req, res) => {
  db.query("SELECT * FROM usuarios WHERE tipoUsuario = 'aluno'", (err, result) => {
    if (err) {
      console.error("Erro ao filtrar alunos:", err);
      res.status(500).send(err);
      return;
    }
    res.send(result);
  });
});

// Rota para salvar avaliação
app.post("/avaliacao", (req, res) => {
  const data = req.body;

  // Ajustar a data para o formato correto
  if (data.data_consulta) {
    data.data_consulta = new Date(data.data_consulta).toISOString().split('T')[0];
  }

  // Converter valores booleanos
  data.sinais_ansiedade = data.sinais_ansiedade === 'Sim' ? 1 : 0;
  data.expressao_sentimentos = data.expressao_sentimentos === 'Sim' ? 1 : 0;
  data.reconhecimento_impacto = data.reconhecimento_impacto === 'Sim' ? 1 : 0;
  data.arrependimento = data.arrependimento === 'Sim' ? 1 : 0;
  data.identificacao_motivo = data.identificacao_motivo === 'Sim' ? 1 : 0;
  data.disposto_a_implementar = data.disposto_a_implementar === 'Sim' ? 1 : 0;

  db.query("INSERT INTO avaliacoes SET ?", data, (err, result) => {
    if (err) {
      console.error('Erro ao inserir avaliação:', err);
      res.status(500).send(err);
    } else {
      res.send({ msg: "Avaliação salva com sucesso" });
    }
  });
});

/*app.listen(3001, () => {
  console.log("rodando na porta 3001");
});*/

exports.api = onRequest(app);

//exports.api = functions.https.onRequest(app);