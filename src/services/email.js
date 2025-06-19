const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendObraDetailsEmail = async(toEmail, obra) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: `Detalhes da Obra: ${obra.nome}`,
        html: `
        <h1>Detalhes da Obra</h1>
        <h2>${obra.nome}</h2>
        <p><strong>Responsável:</strong> ${obra.responsavel}</p>
        <p><strong> Data de Início:</strong> ${obra.dataInicio.toLocaleDateString()}</p>
        <p><strong>Localização:</strong> Latitude:${obra.localizacao.lat}, Longitude: ${obra.localizacao.lng}</p>
        <p><strong>Descrição:</strong> ${obra.descricao || 'Nenhuma descrição fornecida'}</p>
        ${obra.foto ? `<img src="${obra.foto}" alt="Foto da Obra" width="300">` : ''}`
    };

    try{
        await transporter.sendMail(mailOptions);
        console.log(`Email enviado para ${toEmail}`);
    }   catch (error){
        console.error('Erro ao enviar email:', error);
        throw error;
    }
};

module.exports = {sendObraDetailsEmail};