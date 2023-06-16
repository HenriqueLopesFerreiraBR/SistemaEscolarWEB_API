const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    nome: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    disciplina: {
      type: String,
      required: true
    },
    informacoesAdicionais: {
      type: mongoose.Schema.Types.Mixed
    }
  },{timestamps:true});
  
  module.exports = mongoose.model('Teacher', TeacherSchema);