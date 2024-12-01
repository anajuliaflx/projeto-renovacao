
const db = require("./db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const insertUser = (name, email, password, matricula, tipoUsuario) => {
  bcrypt.hash(password, saltRounds, (error, hash) => {
    if (error) {
      console.error("Erro ao criptografar senha:", error);
      return;
    }
    db.query(
      `INSERT INTO usuarios (nome, email, senha, matricula, tipoUsuario) VALUES (?, ?, ?, ?, ?)`,
      [name, email, hash, matricula, tipoUsuario],
      (err) => {
        if (err) {
          console.error(`Erro ao inserir o usuário '${name}':`, err);
        } else {
          console.log(`Usuário '${name}' inserido com sucesso`);
        }
      }
    );
  });
};

const insertUsers = () => {
  insertUser("João Arthur Campos", "joaoarthurcampos@yopmail.com", "joao1234", "44144114", "administrador");
  insertUser("Pedro Henrique Henry Iago Silveira", "pedrosilveira77@yopmail.com", "pedro1234", "44244224", "aluno");
  insertUser("Cristiane Malu Natália Gonçalves", "cristianegoncalves98@yopmail.com", "cris1234", "44344334", "psicologo");
};

// Executa a inserção de dados iniciais
insertUsers();
