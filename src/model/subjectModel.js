const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
    nome: {
      type: String,
      required: true
    },
    descricao: {
      type: String
    }
  },{timestamps:true});
  
module.exports = mongoose.model('Subject', SubjectSchema);