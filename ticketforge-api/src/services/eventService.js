
const eventRepository = require('../repositories/eventRepository');

// Consultar todos los eventos
async function getAllEvents() {
  return await eventRepository.findAll();
}

// Consultar un evento por ID
async function getEventById(id) {
  return await eventRepository.findById(id);
}

// Crear un evento
async function createEvent(event) {
  return await eventRepository.create(event);
}

// Actualizar un evento
async function updateEvent(id, event) {
  return await eventRepository.update(id, event);
}

// Eliminar un evento
async function deleteEvent(id) {
  return await eventRepository.deleteById(id);
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
