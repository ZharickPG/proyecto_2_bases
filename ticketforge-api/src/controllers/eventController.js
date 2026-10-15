
const eventService = require('../services/eventService');

// GET: consultar todos los eventos
async function getAllEvents(req, res) {
  try {
    const events = await eventService.getAllEvents();
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error al consultar eventos:', error.message);

    return res.status(500).json({
      error: 'Error al consultar los eventos'
    });
  }
}

// GET: consultar un evento por ID
async function getEventById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: 'El ID debe ser un número entero positivo'
    });
  }

  try {
    const event = await eventService.getEventById(id);

    if (!event) {
      return res.status(404).json({
        error: 'Evento no encontrado'
      });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error('Error al consultar evento:', error.message);

    return res.status(500).json({
      error: 'No se pudo consultar el evento'
    });
  }
}

// POST: crear un evento
async function createEvent(req, res) {
  try {
    const body = req.body || {};

    const {
      name,
      location,
      date_time,
      category,
      min_price,
      max_price,
      description
    } = body;

    const requiredFields = [
      'name',
      'location',
      'date_time',
      'category',
      'min_price',
      'max_price'
    ];

    const missingFields = requiredFields.filter(
      field =>
        body[field] === undefined ||
        body[field] === null ||
        body[field] === ''
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios',
        fields: missingFields
      });
    }

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof location !== 'string' ||
      !location.trim()
    ) {
      return res.status(400).json({
        error: 'El nombre y la ubicación son obligatorios'
      });
    }

    if (!['concert', 'sports', 'theater'].includes(category)) {
      return res.status(400).json({
        error: 'La categoría debe ser concert, sports o theater'
      });
    }

    const minPrice = Number(min_price);
    const maxPrice = Number(max_price);

    if (
      !Number.isFinite(minPrice) ||
      !Number.isFinite(maxPrice) ||
      minPrice < 0 ||
      maxPrice < 0
    ) {
      return res.status(400).json({
        error: 'Los precios deben ser números positivos o cero'
      });
    }

    if (minPrice > maxPrice) {
      return res.status(400).json({
        error: 'El precio mínimo no puede superar el máximo'
      });
    }

    if (
      typeof date_time !== 'string' ||
      Number.isNaN(Date.parse(date_time))
    ) {
      return res.status(400).json({
        error: 'La fecha del evento no es válida'
      });
    }

    const id_event = await eventService.createEvent({
      name: name.trim(),
      location: location.trim(),
      date_time,
      category,
      min_price: minPrice,
      max_price: maxPrice,
      description: description ?? null
    });

    return res.status(201).json({
      mensaje: 'Evento creado correctamente',
      id_event
    });
  } catch (error) {
    console.error('Error al crear evento:', error.message);

    return res.status(500).json({
      error: 'No se pudo crear el evento'
    });
  }
}

// PUT: actualizar un evento existente
async function updateEvent(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: 'El ID debe ser un número entero positivo'
    });
  }

  try {
    const existingEvent = await eventService.getEventById(id);

    if (!existingEvent) {
      return res.status(404).json({
        error: 'Evento no encontrado'
      });
    }

    const body = req.body || {};

    const {
      name,
      location,
      date_time,
      category,
      min_price,
      max_price,
      description
    } = body;

    const requiredFields = [
      'name',
      'location',
      'date_time',
      'category',
      'min_price',
      'max_price'
    ];

    const missingFields = requiredFields.filter(
      field =>
        body[field] === undefined ||
        body[field] === null ||
        body[field] === ''
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Debes enviar todos los campos obligatorios',
        fields: missingFields
      });
    }

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof location !== 'string' ||
      !location.trim()
    ) {
      return res.status(400).json({
        error: 'El nombre y la ubicación son obligatorios'
      });
    }

    if (!['concert', 'sports', 'theater'].includes(category)) {
      return res.status(400).json({
        error: 'La categoría debe ser concert, sports o theater'
      });
    }

    const minPrice = Number(min_price);
    const maxPrice = Number(max_price);

    if (
      !Number.isFinite(minPrice) ||
      !Number.isFinite(maxPrice) ||
      minPrice < 0 ||
      maxPrice < 0
    ) {
      return res.status(400).json({
        error: 'Los precios deben ser números positivos o cero'
      });
    }

    if (minPrice > maxPrice) {
      return res.status(400).json({
        error: 'El precio mínimo no puede superar el máximo'
      });
    }

    if (
      typeof date_time !== 'string' ||
      Number.isNaN(Date.parse(date_time))
    ) {
      return res.status(400).json({
        error: 'La fecha del evento no es válida'
      });
    }

    await eventService.updateEvent(id, {
      name: name.trim(),
      location: location.trim(),
      date_time,
      category,
      min_price: minPrice,
      max_price: maxPrice,
      description: description ?? null
    });

    return res.status(200).json({
      mensaje: 'Evento actualizado correctamente',
      id_event: id
    });
  } catch (error) {
    console.error('Error al actualizar evento:', error.message);

    return res.status(500).json({
      error: 'No se pudo actualizar el evento'
    });
  }
}

// DELETE: eliminar un evento
async function deleteEvent(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: 'El ID debe ser un número entero positivo'
    });
  }

  try {
    const deletedRows = await eventService.deleteEvent(id);

    if (deletedRows === 0) {
      return res.status(404).json({
        error: 'Evento no encontrado'
      });
    }

    return res.status(200).json({
      mensaje: 'Evento eliminado correctamente',
      id_event: id
    });
  } catch (error) {
    console.error('Error al eliminar evento:', error.message);

    return res.status(500).json({
      error: 'No se pudo eliminar el evento'
    });
  }
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
