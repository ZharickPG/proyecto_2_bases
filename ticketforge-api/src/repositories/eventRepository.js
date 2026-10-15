
const pool = require('../config/database');

async function findAll() {
  const [rows] = await pool.query(`
    SELECT
      id_event,
      name,
      location,
      date_time,
      category,
      min_price,
      max_price,
      description
    FROM events
    ORDER BY date_time ASC
  `);

  return rows;
}

async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT
      id_event,
      name,
      location,
      date_time,
      category,
      min_price,
      max_price,
      description
    FROM events
    WHERE id_event = ?`,
    [id]
  );

  return rows[0] || null;
}

async function create(event) {
  const {
    name,
    location,
    date_time,
    category,
    min_price,
    max_price,
    description
  } = event;

  const [result] = await pool.execute(
    `INSERT INTO events
      (name, location, date_time, category,
       min_price, max_price, description)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      location,
      date_time,
      category,
      min_price,
      max_price,
      description ?? null
    ]
  );

  return result.insertId;
}

async function update(id, event) {
  const {
    name,
    location,
    date_time,
    category,
    min_price,
    max_price,
    description
  } = event;

  const [result] = await pool.execute(
    `UPDATE events
     SET name = ?,
         location = ?,
         date_time = ?,
         category = ?,
         min_price = ?,
         max_price = ?,
         description = ?
     WHERE id_event = ?`,
    [
      name,
      location,
      date_time,
      category,
      min_price,
      max_price,
      description ?? null,
      id
    ]
  );

  return result.affectedRows;
}

async function deleteById(id) {
  const [result] = await pool.execute(
    'DELETE FROM events WHERE id_event = ?',
    [id]
  );

  return result.affectedRows;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById
};
