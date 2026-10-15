const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Comprobar la conexión con MySQL
app.get('/api/health/db', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT DATABASE() AS base_de_datos'
    );

    res.json({
      status: 'ok',
      mensaje: 'TicketForge está funcionando',
      base_de_datos: rows[0].base_de_datos
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      status: 'error',
      mensaje: 'No se pudo consultar la base de datos'
    });
  }
});

// Rutas de la API
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

module.exports = app;