var pool = require('./bd'); // conexión BD
var md5 = require('md5');

async function getUserByUsernameAndPassword(user, password) {
    try {
        var query = 'SELECT id, usuario FROM usuarios WHERE usuario = ? AND password = ? LIMIT 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0]; // devuelve el primer resultado
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUserByUsernameAndPassword };

