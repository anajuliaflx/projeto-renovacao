const mysql = require("mysql2");
const functions = require("firebase-functions");
require('dotenv').config();

console.log('Variáveis de ambiente carregadas:', process.env);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect(err => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log("Banco de dados conectado");
});

module.exports = db;