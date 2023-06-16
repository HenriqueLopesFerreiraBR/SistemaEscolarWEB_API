const express = require('express');
const Lesson = require('../model/lessonModel');
const verifyToken = require('../middleware/autheticationMiddleware');

const router = express.Router();

// Rota para obter todas as aulas
router.get('/lessons', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (error) {
    console.error('Erro ao obter as aulas:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter as aulas.' });
  }
});

// Rota para obter uma aula pelo ID
router.get('/lessons/:id', async (req, res) => {
  const lessonId = req.params.id;

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: 'Aula não encontrada.' });
    }
    res.json(lesson);
  } catch (error) {
    console.error('Erro ao obter a aula:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter a aula.' });
  }
});

// Rota para criar uma nova aula
router.post('/lessons', async (req, res) => {
  const { nome, descricao, professor, classe } = req.body;

  try {
    const newLesson = new Lesson({
      nome,
      descricao,
      professor,
      classe
    });

    const createdLesson = await newLesson.save();
    res.status(201).json(createdLesson);
  } catch (error) {
    console.error('Erro ao criar a aula:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar a aula.' });
  }
});

// Rota para atualizar uma aula pelo ID
router.put('/lessons/:id', async (req, res) => {
  const lessonId = req.params.id;
  const updates = req.body;

  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, updates, { new: true });
    if (!updatedLesson) {
      return res.status(404).json({ error: 'Aula não encontrada.' });
    }
    res.json(updatedLesson);
  } catch (error) {
    console.error('Erro ao atualizar a aula:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar a aula.' });
  }
});

// Rota para excluir uma aula pelo ID
router.delete('/lessons/:id', async (req, res) => {
  const lessonId = req.params.id;

  try {
    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);
    if (!deletedLesson) {
      return res.status(404).json({ error: 'Aula não encontrada.' });
    }
    res.json(deletedLesson);
  } catch (error) {
    console.error('Erro ao excluir a aula:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao excluir a aula.' });
  }
});

module.exports = router;
