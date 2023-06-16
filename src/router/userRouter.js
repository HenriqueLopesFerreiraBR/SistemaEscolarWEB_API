const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const verifyToken = require("../middleware/autheticationMiddleware");

router.get('/', async(req, res)=>{
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao obter o usuário:", error);
        res.status(400).json(error);
    }
})

router.get("/:id", verifyToken, async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao obter o usuário:", error);
        res.status(400).json(error);
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    const id = req.params.id;
    var { nome, email, senha, tipo, informacoesAdicionais } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { nome, email, senha, tipo, informacoesAdicionais },
            { new: true }
        );
        res.status(203).json(user);
    } catch (error) {
        console.error("Erro ao atualizar o usuário:", error);
        res.status(422).json(error);
    }
});

router.delete("/students/:id", verifyToken, async (req, res) => {
    const studentId = req.params.id;

    try {
        const student = await Student.findByIdAndDelete(studentId);
        if (!student) {
            return res.status(404).json({ error: "Estudante não encontrado." });
        }
        res.status(205).json(student);
    } catch (error) {
        console.error("Erro ao excluir o estudante:", error);
        res.status(500).json({
            error: "Ocorreu um erro ao excluir o estudante.",
        });
    }
});
module.exports = router;
