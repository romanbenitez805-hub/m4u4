  
  require('dotenv').config(); // cargar variables de entorno
  
  var mysql = require('mysql2');
var util = require('util');

// Crear conexión a la base de datos usando variables de entorno
var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME
});

/*MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DB_NAME= ejercicio01 */


pool.query = util.promisify(pool.query); // Promisify para usar async/await
module.exports = pool;