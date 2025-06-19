const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectdb = async () => {
    try{
       mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB conectado com sucesso');
    } catch (error) {
        console.error('Erro na conexão com MongoDB:' , error.message);
    process.exit(1);
    }
};

module.exports = connectdb;