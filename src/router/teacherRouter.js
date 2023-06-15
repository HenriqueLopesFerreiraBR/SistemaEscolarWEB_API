const express = require('express');
const Teacher = require('./models/Teacher');
const verifyToken = require('../middleware/autheticationMiddleware');

const router = express.Router();

// Rota para obter todos os professores
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    console.error('Erro ao obter os professores:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter os professores.' });
  }
});

// Rota para obter um professor pelo ID
router.get('/teachers/:id', async (req, res) => {
  const teacherId = req.params.id;

  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: 'Professor não encontrado.' });
    }
    res.json(teacher);
  } catch (error) {
    console.error('Erro ao obter o professor:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter o professor.' });
  }
});

// Rota para criar um novo professor
router.post('/teachers', async (req, res) => {
  const { nome, email, disciplina } = req.body;

  try {
    const teacher = new Teacher({
      nome,
      email,
      disciplina
    });

    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error('Erro ao criar o professor:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar o professor.' });
  }
});

// Rota para atualizar um professor pelo ID
router.put('/teachers/:id', async (req, res) => {
  const teacherId = req.params.id;
  const updates = req.body;

  try {
    const teacher = await Teacher.findByIdAndUpdate(teacherId, updates, { new: true });
    if (!teacher) {
      return res.status(404).json({ error: 'Professor não encontrado.' });
    }
    res.json(teacher);
  } catch (error) {
    console.error('Erro ao atualizar o professor:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar o professor.' });
  }
});

// Rota para excluir um professor pelo ID
router.delete('/teachers/:id', async (req, res) => {
  const teacherId = req.params.id;

  try {
    const teacher = await Teacher.findByIdAndDelete(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: 'Professor não encontrado.' });
    }
    res.json(teacher);
  } catch (error) {
    console.error('Erro ao excluir o professor:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao excluir o professor.' });
  }
});

module.exports = router;
