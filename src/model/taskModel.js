const mongoose = require('mongoose')

// Model de Tarefa
const TaskSchema = new mongoose.Schema({
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
    dataEntrega: {
      type: Date,
      required: true
    },
    descricao: {
      type: String,
      required: true
    }
  },{timestamps:true});
 
 module.exports = mongoose.model('Task', TaskSchema);