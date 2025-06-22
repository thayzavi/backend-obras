const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const obraRoutes = require('./src/routes/obraRoutes');
const fiscalizacaoRoutes = require('./src/routes/fiscalizacaoRoutes');

const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('dotenv').config();

connectDB();

app.use('/api/obras', obraRoutes);
app.use('/api/fiscalizacoes', fiscalizacaoRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message:'Algo deu errado'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
