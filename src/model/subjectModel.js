const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
    nome: {
      type: String,
      required: true
    },
    descricao: {
      type: String
    }
  });
  
module.exports = mongoose.model('Subject', SubjectSchema);