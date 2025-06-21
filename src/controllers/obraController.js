const Obra = require('../../src/models/Obra');
const Fiscalizacao = require('../../src/models/Fiscalizacao');
const {sendObraDetailsEmail} = require('../../src/services/email');

exports.getAllObras = async (req, res) => { //busca todas as obras do banco
    try{
        const obras = await Obra.find().sort({
            createdAt: -1
        });
        res.json(obras);
    }   catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createObra = async (req, res) => {//Criar uma nova obra, e salva no banco
    try {
        const obra = new Obra(req.body);
        await obra.save();
        res.status(201).json(obra);
    }   catch(error) {
        res.status(400).json({message: error.message});
    }
};

exports.getObraById = async (req, res) => {//Busca uma rota específica pelo id
    try{
        const obra = await Obra.findById(req.params.id);
        if (!obra) {
            return res.status(404).json({message: 'Obra não encontrada'});
        }
        res.json(obra);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.updateObra = async (req, res) => {//atualiza uma obra 
    try {
        const obra = await Obra.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!obra) {
            return res.status(404).json({message: 'Obra não encontrada'});
        }
        res.json(obra);
    }   catch (error) {
        res.status(400).json({message: error.message});
    }
};

exports.deleteObra = async( req, res) => {//deletar uma obra
    try{
        const obra = await Obra.findByIdAndDelete(req.params.id);
        if (!obra) {
            return res.status(404).json({message: 'Obra não encontrada'});
        }
        await Fiscalizacao.deleteMany({obra: req.params.id});
            res.json({message: 'Obra e fiscalizações relacionadas removidas'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
};

exports.getFiscalizacoesByObra = async (req, res) => { //lista as fiscalizações relacionas a uma obra 
    try{
        const fiscalizacoes = await Fiscalizacao.find({
            obra: req.params.id}) .sort({ data: -1});
            res.json(fiscalizacoes);
        }   catch (error) {
            res.status(500).json({message: error.message});
    }
};

exports.sendObraDetails = async (req, res) => {//busca as informações da obra e enviar pelo email
    try{
        const obra = await Obra.findById(req.params.id);
        if(!obra) {
            return res.status(404).json({message: 'Obra não encontrada'});
        }

        const fiscalizacoes = await Fiscalizacao.find({ obra: obra._id}); //busca as informações da fiscalização 

        const {email} = req.body;
        await sendObraDetailsEmail(email, obra, fiscalizacoes);

        res.json({message: 'Detalhes da obra enviados por email'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};
