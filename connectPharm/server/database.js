const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: " ",
    database: "connectPharm_db"
});
connection.connect(error => {
    if (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    } else {
        console.log("Conectado ao banco de dados!");
    }
});
module.exports = connection;
