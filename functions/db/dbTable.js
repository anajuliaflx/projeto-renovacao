// migrations/createTables.js
const db = require("./db");

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    matricula VARCHAR(8) UNIQUE NOT NULL,
    tipoUsuario VARCHAR(50) NOT NULL,
    logged_in TINYINT(1) DEFAULT 0,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const createTrilhasTable = `
  CREATE TABLE IF NOT EXISTS trilhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    matricula_aluno VARCHAR(8) NOT NULL,
    FOREIGN KEY (matricula_aluno) REFERENCES usuarios(matricula) ON DELETE CASCADE
  );
`;

const createLinksTable = `
  CREATE TABLE IF NOT EXISTS links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    trilha_id INT NOT NULL,
    FOREIGN KEY (trilha_id) REFERENCES trilhas(id) ON DELETE CASCADE
  );
`;

const createLinksAssistidosTable = `
  CREATE TABLE IF NOT EXISTS links_assistidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    link_id INT NOT NULL,
    matricula_aluno VARCHAR(8) NOT NULL,
    assistido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (link_id) REFERENCES links(id) ON DELETE CASCADE,
    FOREIGN KEY (matricula_aluno) REFERENCES usuarios(matricula) ON DELETE CASCADE
  );
`;

const createEventosTable = `
  CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_evento DATE NOT NULL,
    matricula_aluno VARCHAR(8) NOT NULL,
    matricula_psicologo VARCHAR(8) NOT NULL,
    descricao TEXT NOT NULL,
    FOREIGN KEY (matricula_aluno) REFERENCES usuarios(matricula) ON DELETE CASCADE,
    FOREIGN KEY (matricula_psicologo) REFERENCES usuarios(matricula) ON DELETE CASCADE
  );
`;

const createMensagensTable = `
  CREATE TABLE IF NOT EXISTS mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    remetente_id INT NOT NULL,
    destinatario_tipo ENUM('administrador', 'psicologo') NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (remetente_id) REFERENCES usuarios(id) ON DELETE CASCADE
  );
`;

const createRespostasTable = `
  CREATE TABLE IF NOT EXISTS respostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mensagem_id INT NOT NULL,
    resposta TEXT NOT NULL,
    data_resposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    matricula_psicologo VARCHAR(8),
    matricula_administrador VARCHAR(8),
    FOREIGN KEY (mensagem_id) REFERENCES mensagens(id) ON DELETE CASCADE
  );
`;

const createAvaliacoesTable = `
  CREATE TABLE IF NOT EXISTS avaliacoes (
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
    FOREIGN KEY (matricula_aluno) REFERENCES usuarios(matricula) ON DELETE CASCADE,
    FOREIGN KEY (matricula_psicologo) REFERENCES usuarios(matricula) ON DELETE CASCADE
  );
`;

// Função para verificar e criar tabelas
const dbTable = () => {
  const queries = [
    { name: "usuarios", query: createUsersTable },
    { name: "trilhas", query: createTrilhasTable },
    { name: "links", query: createLinksTable },
    { name: "links_assistidos", query: createLinksAssistidosTable },
    { name: "eventos", query: createEventosTable },
    { name: "mensagens", query: createMensagensTable },
    { name: "respostas", query: createRespostasTable },
    { name: "avaliacoes", query: createAvaliacoesTable },
  ];

  queries.forEach(({ name, query }) => {
    db.query(query, (err) => {
      if (err) {
        console.error(`Erro ao criar a tabela '${name}':`, err);
      } else {
        console.log(`Tabela '${name}' verificada/criada com sucesso.`);
      }
    });
  });
};

// Executa a função de criação ao importar o arquivo
dbTable();

module.exports = dbTable;
