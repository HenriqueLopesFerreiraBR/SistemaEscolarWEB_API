const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  matricula: {
    type: String,
    required: true,
    unique: true
  },
  turma: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  informacoesAdicionais: {
    type: mongoose.Schema.Types.Mixed // Pode ser personalizado de acordo com as informações necessárias
  }
},{timestamps:true});


module.exports = mongoose.model('Student', StudentSchema);
