const mongoose = require('mongoose')

// Model de Nota
const GradeSchema = new mongoose.Schema({
    aluno: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    disciplina: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    valor: {
      type: Number,
      required: true
    }
  },{timestamps:true});
  
  module.exports = mongoose.model('Grade', GradeSchema);