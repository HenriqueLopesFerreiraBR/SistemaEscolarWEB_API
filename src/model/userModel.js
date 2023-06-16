const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['aluno', 'professor', 'administrador'],
    required: true
  },
  informacoesAdicionais: {
    type: mongoose.Schema.Types.Mixed // Pode ser personalizado de acordo com as informações necessárias
  }
},{timestamps:true});

const User = mongoose.model('User', UserSchema);

module.exports = User;