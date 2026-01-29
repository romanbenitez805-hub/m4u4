const pool = require('./bd');

async function getEmpleados() {
  try {
    const query = "SELECT * FROM empleados";
    const rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getEmpleados };
