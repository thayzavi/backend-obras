const dotenv = require('dotenv');
require('dotenv').config();


const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const obraRoutes = require('./src/routes/obraRoutes');
const fiscalizacaoRoutes = require('./src/routes/fiscalizacaoRoutes');
const assistenteRoutes = require('./src/routes/assistenteRoutes');

const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' })); // Define o limite máximo do tamanho , para base64

//Limita a requisição a 10 meg, para img muitos grandes
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

require('dotenv').config();

connectDB();

app.use('/api/obras', obraRoutes);
app.use('/api/fiscalizacoes', fiscalizacaoRoutes);
app.use('api/assistente', assistenteRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message:'Algo deu errado'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
