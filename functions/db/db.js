const mysql = require("mysql2");
require('dotenv').config();

console.log('Variáveis de ambiente carregadas:', process.env);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error(`Falha ao conectar ao banco de dados: ${err.message}. Verifique as credenciais e a conectividade.`);
  } else {
    console.log("Conexão bem-sucedida ao banco de dados.");
  }
});

module.exports = db;