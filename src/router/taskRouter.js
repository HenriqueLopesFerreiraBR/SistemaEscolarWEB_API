const express = require("express");
const Task = require("../model/taskModel");

const router = express.Router();

// Rota para obter todas as tarefas
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error("Erro ao obter as tarefas:", error);
        res.status(500).json({ error: "Ocorreu um erro ao obter as tarefas." });
    }
});

// Rota para obter uma tarefa pelo ID
router.get("/tasks/:id", async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: "Tarefa não encontrada." });
        }
        res.json(task);
    } catch (error) {
        console.error("Erro ao obter a tarefa:", error);
        res.status(500).json({ error: "Ocorreu um erro ao obter a tarefa." });
    }
});

// Rota para criar uma nova tarefa
router.post("/tasks", async (req, res) => {
    const { nome, descricao, dataEntrega } = req.body;

    try {
        const newTask = new Task({
            nome,
            descricao,
            dataEntrega,
        });

        const createdTask = await newTask.save();
        res.status(201).json(createdTask);
    } catch (error) {
        console.error("Erro ao criar a tarefa:", error);
        res.status(500).json({ error: "Ocorreu um erro ao criar a tarefa." });
    }
});

// Rota para atualizar uma tarefa pelo ID
router.put("/tasks/:id", async (req, res) => {
    const taskId = req.params.id;
    const updates = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
            new: true,
        });
        if (!updatedTask) {
            return res.status(404).json({ error: "Tarefa não encontrada." });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
        res.status(500).json({
            error: "Ocorreu um erro ao atualizar a tarefa.",
        });
    }
});

// Rota para excluir uma tarefa pelo ID
router.delete("/tasks/:id", async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ error: "Tarefa não encontrada." });
        }
        res.json(deletedTask);
    } catch (error) {
        console.error("Erro ao excluir a tarefa:", error);
        res.status(500).json({ error: "Ocorreu um erro ao excluir a tarefa." });
    }
});

module.exports = router;
