const express = require('express');
const Subject = require('../model/subjectModel');

const router = express.Router();

// Rota para obter todas as disciplinas
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    console.error('Erro ao obter as disciplinas:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter as disciplinas.' });
  }
});

// Rota para obter uma disciplina pelo ID
router.get('/subjects/:id', async (req, res) => {
  const subjectId = req.params.id;

  try {
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ error: 'Disciplina não encontrada.' });
    }
    res.json(subject);
  } catch (error) {
    console.error('Erro ao obter a disciplina:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter a disciplina.' });
  }
});

// Rota para criar uma nova disciplina
router.post('/subjects', async (req, res) => {
  const { nome, descricao } = req.body;

  try {
    const newSubject = new Subject({
      nome,
      descricao
    });

    const createdSubject = await newSubject.save();
    res.status(201).json(createdSubject);
  } catch (error) {
    console.error('Erro ao criar a disciplina:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar a disciplina.' });
  }
});

// Rota para atualizar uma disciplina pelo ID
router.put('/subjects/:id', async (req, res) => {
  const subjectId = req.params.id;
  const updates = req.body;

  try {
    const updatedSubject = await Subject.findByIdAndUpdate(subjectId, updates, { new: true });
    if (!updatedSubject) {
      return res.status(404).json({ error: 'Disciplina não encontrada.' });
    }
    res.json(updatedSubject);
  } catch (error) {
    console.error('Erro ao atualizar a disciplina:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar a disciplina.' });
  }
});

// Rota para excluir uma disciplina pelo ID
router.delete('/subjects/:id', async (req, res) => {
  const subjectId = req.params.id;

  try {
    const deletedSubject = await Subject.findByIdAndDelete(subjectId);
    if (!deletedSubject) {
      return res.status(404).json({ error: 'Disciplina não encontrada.' });
    }
    res.json(deletedSubject);
  } catch (error) {
    console.error('Erro ao excluir a disciplina:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao excluir a disciplina.' });
  }
});

module.exports = router;
