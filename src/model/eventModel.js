const mongoose = require('mongoose')

// Model de Evento
const EventSchema = new mongoose.Schema({
    titulo: {
      type: String,
      required: true
    },
    descricao: {
      type: String
    },
    data: {
      type: Date,
      required: true
    },
    hora: {
      type: String
    }
  },{timestamps:true});
  
module.exports = mongoose.model('Event', EventSchema);