
const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

// GET: consultar todos los eventos
router.get('/', eventController.getAllEvents);

// GET: consultar un evento por ID
router.get('/:id', eventController.getEventById);

// POST: crear un evento
router.post('/', eventController.createEvent);

// PUT: actualizar un evento
router.put('/:id', eventController.updateEvent);

// DELETE: eliminar un evento
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
