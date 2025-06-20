const Fiscalizacao = require('../../src/models/Fiscalizacao');
const Obra = require('../../src/models/Obra');

exports.getAllFiscalizacoes = async (req, res) => {
    try {
    const fiscalizacoes = await Fiscalizacao.find().sort({ data: -1 }).populate('obra');
    res.json(fiscalizacoes);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

exports.createFiscalizacao = async (req, res) => {
    try {
        const obra = await Obra.findById(req.body.obra);
        if (!obra) {
            return res.status(404).json({ message: 'Obra não encontrada' });
        }

        const novaFiscalizacao = new Fiscalizacao(req.body);
        await novaFiscalizacao.save();
        res.status(201).json(novaFiscalizacao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getFiscalizacaoById = async (req, res) => {
    try{
        const fiscalizacao = await Fiscalizacao.findById(req.params.id).populate('obra');
        if (!fiscalizacao) {
            return res.status(404).json({ message: 'Fiscalização não encontrada'});
        }
        res.json(fiscalizacao);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.updateFiscalizacao = async (req, res) => {
    try {
        const fiscalizacao = await Fiscalizacao.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('obra');

        if(!fiscalizacao) {
            return res.status(404).json({ message: 'Fiscalização não encontrada'});
        }
        res.json(fiscalizacao);
    }   catch (error) {
        res.status(400).json({message: error.message})
    }
};

exports.deleteFiscalizacao = async (req, res) => {
    try {
        const fiscalizacao = await Fiscalizacao.findByIdAndDelete(req.params.id);
        if(!fiscalizacao) {
            return res.status(404).json({ message: 'Fiscalização não encontrada'});
        }
        res.json({ message: 'Fiscalização removida'});
    }   catch (error) {
        res.status(400).json({message: error.message})
    }
};

