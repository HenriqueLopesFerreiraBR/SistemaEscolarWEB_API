const mongoose = require('mongoose')

const ClassSchema = new mongoose.Schema({
    nome: {
      type: String,
      required: true
    },
    anoSemestre: {
      type: String,
      required: true
    },
    alunos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }],
    professorResponsavel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    }
  },{timestamps:true});
  
module.exports = mongoose.model('Class', ClassSchema);