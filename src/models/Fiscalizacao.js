const mongoose = require('mongoose');

const FiscalizacaoSchema = new mongoose.Schema({
    data:{
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['pendente', 'em-andamento', 'concluido', 'atrasado'],
        default: 'pendente'
    },
    observacoes :{
        type: String,
        trim: true
    },
     localizacao: {
        lat:{ type: Number, required: true},
        lng: { type: Number, required: true}
    },
    foto: {
        type: String
    },
    obra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Obra',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Fiscalizacao', FiscalizacaoSchema);