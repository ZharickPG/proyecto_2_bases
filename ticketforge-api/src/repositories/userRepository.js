
const pool = require('../config/database');

// Consultar todos los usuarios sin mostrar contraseñas
async function findAll() {
  const [rows] = await pool.execute(
    `SELECT id_user, name, email, role
     FROM users
     ORDER BY id_user ASC`
  );

  return rows;
}

// Consultar un usuario por su identificador
async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT id_user, name, email, role
     FROM users
     WHERE id_user = ?`,
    [id]
  );

  return rows[0] || null;
}

// Buscar un usuario por correo para el login
async function findByEmailForLogin(email) {
  const [rows] = await pool.execute(
    `SELECT id_user, name, email, password, role
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [email]
  );

  return rows[0] || null;
}

// Crear un usuario
async function create(user) {
  const { name, email, password } = user;
  const role = user.role || 'user';

  const [result] = await pool.execute(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [name, email, password, role]
  );

  return {
    id_user: result.insertId,
    name,
    email,
    role
  };
}

// Actualizar los datos de un usuario
async function update(id, user) {
  const existingUser = await findById(id);

  if (!existingUser) {
    return null;
  }

  const allowedFields = ['name', 'email', 'password', 'role'];

  const fields = allowedFields.filter(
    field => user[field] !== undefined
  );

  if (fields.length === 0) {
    return existingUser;
  }

  const values = fields.map(field => user[field]);

  const setClause = fields
    .map(field => `\`${field}\` = ?`)
    .join(', ');

  await pool.execute(
    `UPDATE users
     SET ${setClause}
     WHERE id_user = ?`,
    [...values, id]
  );

  return findById(id);
}

// Eliminar un usuario
async function deleteById(id) {
  const [result] = await pool.execute(
    'DELETE FROM users WHERE id_user = ?',
    [id]
  );

  return result.affectedRows > 0;
}

module.exports = {
  findAll,
  findById,
  findByEmailForLogin,
  create,
  update,
  deleteById
};
