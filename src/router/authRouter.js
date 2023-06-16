const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const jwt = require('jsonwebtoken');
require("dotenv").config();

//Register
router.post("/register", async (req, res) => {
    var { nome, email, senha, tipo, informacoesAdicionais } = req.body;
   
    try {
        // Gerar o hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Criar o novo usuário
        const user = new User({
            nome:nome,
            email:email,
            senha: hashedPassword,
            tipo,
            informacoesAdicionais,
        });

        // Salvar o usuário no banco de dados
        const newUser = await user.save();
        res.status(201).json(nome);
    } catch (error) {
        console.error("Erro ao criar o usuário:", error);
        throw error;
    }
});
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Encontrar o usuário pelo email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        // Comparar a senha fornecida com a senha armazenada
        const passwordMatch = await bcrypt.compare(senha, user.senha);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Senha incorreta." });
        }
        var secret = 'henrique'
        // Gerar o token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });

        // Autenticação bem-sucedida
        res.status(200).json({ message: "Autenticação bem-sucedida!" ,token });
    } catch (error) {
        console.error("Erro ao realizar a autenticação:", error);
        res.status(500).json({
            error: "Ocorreu um erro ao realizar a autenticação.",
        });
    }
});

module.exports = router;
