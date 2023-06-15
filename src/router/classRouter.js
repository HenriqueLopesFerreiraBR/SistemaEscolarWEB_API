const express = require('express');
const Class = require('../model/classModel');
const verifyToken = require('../middleware/autheticationMiddleware');

const router = express.Router();

// Rota para obter todas as classes
router.get('/classes',verifyToken, async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error('Erro ao obter as classes:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter as classes.' });
  }
});

// Rota para obter uma classe pelo ID
router.get('/classes/:id', verifyToken, async (req, res) => {
  const classId = req.params.id;

  try {
    const classe = await Class.findById(classId);
    if (!classe) {
      return res.status(404).json({ error: 'Classe não encontrada.' });
    }
    res.status(200).json(classe);
  } catch (error) {
    console.error('Erro ao obter a classe:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter a classe.' });
  }
});

// Rota para criar uma nova classe
router.post('/classes',verifyToken, async (req, res) => {
  const { nome, professor, estudantes } = req.body;

  try {
    const newClass = new Class({
      nome,
      professor,
      estudantes
    });

    const createdClass = await newClass.save();
    res.status(201).json(createdClass);
  } catch (error) {
    console.error('Erro ao criar a classe:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar a classe.' });
  }
});

// Rota para atualizar uma classe pelo ID
router.put('/classes/:id',verifyToken, async (req, res) => {
  const classId = req.params.id;
  const updates = req.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(classId, updates, { new: true });
    if (!updatedClass) {
      return res.status(404).json({ error: 'Classe não encontrada.' });
    }
    res.json(updatedClass);
  } catch (error) {
    console.error('Erro ao atualizar a classe:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar a classe.' });
  }
});

// Rota para excluir uma classe pelo ID
router.delete('/classes/:id',verifyToken, async (req, res) => {
  const classId = req.params.id;

  try {
    const deletedClass = await Class.findByIdAndDelete(classId);
    if (!deletedClass) {
      return res.status(404).json({ error: 'Classe não encontrada.' });
    }
    res.json(deletedClass);
  } catch (error) {
    console.error('Erro ao excluir a classe:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao excluir a classe.' });
  }
});

module.exports = router;
