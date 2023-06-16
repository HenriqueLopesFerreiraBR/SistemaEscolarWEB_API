const mongoose = require('mongoose')

// Model de Aula
const LessonSchema = new mongoose.Schema({
    disciplina: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true
    },
    data: {
      type: Date,
      required: true
    },
    hora: {
      type: String,
      required: true
    },
    conteudo: {
      type: String
    }
  },{timestamps:true});
  
  module.exports = mongoose.model('Lesson', LessonSchema);