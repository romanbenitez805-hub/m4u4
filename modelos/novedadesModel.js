const  pool = require('./bd'); // conexión BD

async function getNovedades()  {
    var query = 'SELECT * FROM novedades';
    var rowws = await pool.query(query);
    return rowws;
}


