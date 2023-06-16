const express = require('express');
const Event = require('../model/eventModel');

const router = express.Router();

// Rota para obter todos os eventos
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Erro ao obter os eventos:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter os eventos.' });
  }
});

// Rota para obter um evento pelo ID
router.get('/events/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }
    res.json(event);
  } catch (error) {
    console.error('Erro ao obter o evento:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter o evento.' });
  }
});

// Rota para criar um novo evento
router.post('/events', async (req, res) => {
  const { nome, descricao, data } = req.body;

  try {
    const newEvent = new Event({
      nome,
      descricao,
      data
    });

    const createdEvent = await newEvent.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error('Erro ao criar o evento:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar o evento.' });
  }
});

// Rota para atualizar um evento pelo ID
router.put('/events/:id', async (req, res) => {
  const eventId = req.params.id;
  const updates = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error('Erro ao atualizar o evento:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar o evento.' });
  }
});

// Rota para excluir um evento pelo ID
router.delete('/events/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }
    res.json(deletedEvent);
  } catch (error) {
    console.error('Erro ao excluir o evento:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao excluir o evento.' });
  }
});

module.exports = router;
