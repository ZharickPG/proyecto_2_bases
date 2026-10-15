
const userService = require('../services/userService');

// Validar el identificador
function validId(id) {
  return Number.isInteger(Number(id)) && Number(id) > 0;
}

// Manejar errores comunes de MySQL
function handleError(res, error, operation) {
  console.error(`Error al ${operation}:`, error.message);

  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      message: 'El correo electrónico ya está registrado'
    });
  }

  return res.status(500).json({
    message: `Error al ${operation}`
  });
}

// GET: consultar todos los usuarios
async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return handleError(res, error, 'consultar los usuarios');
  }
}

// GET: consultar un usuario por ID
async function getUserById(req, res) {
  const { id } = req.params;

  if (!validId(id)) {
    return res.status(400).json({
      message: 'El ID debe ser un entero positivo'
    });
  }

  try {
    const user = await userService.getUserById(Number(id));

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return handleError(res, error, 'consultar el usuario');
  }
}

// POST: registrar un usuario
async function createUser(req, res) {
  const { name, email, password } = req.body || {};

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string' ||
    !password
  ) {
    return res.status(400).json({
      message: 'Nombre, correo y contraseña son obligatorios'
    });
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!validEmail.test(email.trim())) {
    return res.status(400).json({
      message: 'El formato del correo electrónico no es válido'
    });
  }

  try {
    const user = await userService.createUser({
      name: name.trim(),
      email: email.trim(),
      password
    });

    return res.status(201).json(user);
  } catch (error) {
    return handleError(res, error, 'crear el usuario');
  }
}

// PUT: actualizar los datos de un usuario
async function updateUser(req, res) {
  const { id } = req.params;

  if (!validId(id)) {
    return res.status(400).json({
      message: 'El ID debe ser un entero positivo'
    });
  }

  const { name, email, password } = req.body || {};

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string' ||
    !password
  ) {
    return res.status(400).json({
      message: 'Nombre, correo y contraseña son obligatorios'
    });
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!validEmail.test(email.trim())) {
    return res.status(400).json({
      message: 'El formato del correo electrónico no es válido'
    });
  }

  try {
    const user = await userService.updateUser(Number(id), {
      name: name.trim(),
      email: email.trim(),
      password
    });

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return handleError(res, error, 'actualizar el usuario');
  }
}

// DELETE: eliminar un usuario
async function deleteUser(req, res) {
  const { id } = req.params;

  if (!validId(id)) {
    return res.status(400).json({
      message: 'El ID debe ser un entero positivo'
    });
  }

  try {
    const deleted = await userService.deleteUser(Number(id));

    if (!deleted) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      message: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    return handleError(res, error, 'eliminar el usuario');
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
