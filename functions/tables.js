const db = require("./db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
    insertUser("João Arthur Campos", "joaoarthurcampos@yopmail.com", "joao1234", "44144114", "administrador");
    insertUser("Pedro Henrique Henry Iago Silveira", "pedrosilveira77@yopmail.com", "pedro1234", "44244224", "aluno");
    insertUser("Cristiane Malu Natália Gonçalves", "cristianegoncalves98@yopmail.com", "cris1234", "44344334", "psicologo");
};

// Verificar e criar tabelas se não existirem
verifyAndCreateTable('usuarios', `
    CREATE TABLE usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL,
      matricula VARCHAR(8) UNIQUE NOT NULL,
      tipoUsuario VARCHAR(50) NOT NULL,
      logged_in TINYINT(1) DEFAULT 0,
      last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    metas ENUM('Melhorar a comunicação', 'Reduzir o uso de redes sociais', 'Participar de sessões de aconselhamento', 'Outras') NOT NULL,
    descricao_metas TEXT,
    progresso_metas ENUM('Não começou', 'Em progresso', 'Quase concluído', 'Concluído') NOT NULL,
    detalhes_progresso TEXT,
    avaliacao_geral ENUM('Muito Insatisfatório', 'Insatisfatório', 'Neutro', 'Satisfatório', 'Muito Satisfatório') NOT NULL,
    comentarios TEXT,
    FOREIGN KEY (matricula_aluno) REFERENCES usuarios(matricula),
    FOREIGN KEY (matricula_psicologo) REFERENCES usuarios(matricula)
  );
`);