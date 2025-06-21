const mongoose = require('mongoose');

const ObraSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    responsavel: {
        type: String,
        required: true,
        trim: true
    },
    dataInicio:{
        type: Date,
        required: true,
    },
    dataFim:{
        type: Date,
        required: false,
    },
    localizacao: {
        lat:{ type: Number, required: true},
        lng: { type: Number, required: true}
    },
    endereco: { 
        type: String, 
        trim: true },
    descricao: {
        type: String,
        trim: true,
    },
    foto: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('Obra', ObraSchema);
