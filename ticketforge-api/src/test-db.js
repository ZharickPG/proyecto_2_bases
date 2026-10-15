
const pool = require('./config/database');

async function testConnection() {
  try {
    const [rows] = await pool.query(
      'SELECT DATABASE() AS base_de_datos, 1 AS conectado'
    );

    console.log('¡Conexión exitosa!');
    console.log(rows[0]);
  } catch (error) {
    console.error('Error de conexión:', error.message);
  } finally {
    await pool.end();
  }
}

testConnection();
