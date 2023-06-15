const express = require('express');
const verifyToken = require('../middleware/autheticationMiddleware');
const Student = require('./models/Student');

const router = express.Router();

// Rota protegida para obter todos os estudantes
router.get('/students', verifyToken, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Erro ao obter os estudantes:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter os estudantes.' });
  }
});

// Rota protegida para obter um estudante pelo ID
router.get('/students/:id', verifyToken, async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Estudante não encontrado.' });
    }
    res.json(student);
  } catch (error) {
    console.error('Erro ao obter o estudante:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter o estudante.' });
  }
});

// Rota protegida para criar um novo estudante
router.post('/students', verifyToken, async (req, res) => {
  const { nome, email, matricula, turma, informacoesAdicionais } = req.body;

  try {
    const student = new Student({
      nome,
      email,
      matricula,
      turma,
      informacoesAdicionais
    });

    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Erro ao criar o estudante:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar o estudante.' });
  }
});

// Rota protegida para atualizar um estudante pelo ID
router.put('/students/:id', verifyToken, async (req, res) => {
  const studentId = req.params.id;
  const updates = req.body;

  try {
    const student = await Student.findByIdAndUpdate(studentId, updates, { new: true });
    if (!student) {
      return res.status(404).json({ error: 'Estudante não encontrado.' });
    }
    res.json(student);
  } catch (error) {
    console.error('Erro ao atualizar o estudante:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar o estudante.' });
  }
});

// Rota protegida para excluir um estudante pelo ID
router.delete('/students/:id', verifyToken, async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Estudante não encontrado.' });
    }
    res.json(student);
  } catch (error) {
    console.error('Erro ao excluir o estudante:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao excluir o estudante.' });
  }
});

module.exports = router;