const express = require('express');
const Grade = require('../model/gradeModel');
const verifyToken = require('../middleware/autheticationMiddleware');

const router = express.Router();

// Rota para obter todas as grades
router.get('/grades', async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (error) {
    console.error('Erro ao obter as grades:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter as grades.' });
  }
});

// Rota para obter uma grade pelo ID
router.get('/grades/:id', async (req, res) => {
  const gradeId = req.params.id;

  try {
    const grade = await Grade.findById(gradeId);
    if (!grade) {
      return res.status(404).json({ error: 'Grade não encontrada.' });
    }
    res.json(grade);
  } catch (error) {
    console.error('Erro ao obter a grade:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter a grade.' });
  }
});

// Rota para criar uma nova grade
router.post('/grades', async (req, res) => {
  const { nome, disciplinas } = req.body;

  try {
    const newGrade = new Grade({
      nome,
      disciplinas
    });

    const createdGrade = await newGrade.save();
    res.status(201).json(createdGrade);
  } catch (error) {
    console.error('Erro ao criar a grade:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar a grade.' });
  }
});

// Rota para atualizar uma grade pelo ID
router.put('/grades/:id', async (req, res) => {
  const gradeId = req.params.id;
  const updates = req.body;

  try {
    const updatedGrade = await Grade.findByIdAndUpdate(gradeId, updates, { new: true });
    if (!updatedGrade) {
      return res.status(404).json({ error: 'Grade não encontrada.' });
    }
    res.json(updatedGrade);
  } catch (error) {
    console.error('Erro ao atualizar a grade:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar a grade.' });
  }
});

// Rota para excluir uma grade pelo ID
router.delete('/grades/:id', async (req, res) => {
  const gradeId = req.params.id;

  try {
    const deletedGrade = await Grade.findByIdAndDelete(gradeId);
    if (!deletedGrade) {
      return res.status(404).json({ error: 'Grade não encontrada.' });
    }
    res.json(deletedGrade);
  } catch (error) {
    console.error('Erro ao excluir a grade:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao excluir a grade.' });
  }
});

module.exports = router;
