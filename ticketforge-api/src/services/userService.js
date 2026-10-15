
const userRepository = require('../repositories/userRepository');

async function getAllUsers() {
  return await userRepository.findAll();
}

async function getUserById(id) {
  return await userRepository.findById(id);
}

async function createUser(user) {
  return await userRepository.create(user);
}

async function updateUser(id, user) {
  return await userRepository.update(id, user);
}

async function deleteUser(id) {
  return await userRepository.deleteById(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
