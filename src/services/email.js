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

const sendObraDetailsEmail = async(toEmail, obra, fiscalizacoes = []) => {
    let fiscalizacoesHtml = '';

    if(fiscalizacoes.length > 0){
        fiscalizacoesHtml = `
        <h2>Fiscalizações</h2>
        <ul>
        ${fiscalizacoes.map( f => `
            <li style="margin-bottom: 15px;">
            <p><strong>Data:</strong> ${new Date(f.data).toLocaleDateString()}</p>
            <p><strong>Status:</strong> ${f.status}</p>
            <p><strong>Observações:</strong> ${f.observacoes || 'Nenhuma'}</p>
            <p><strong>Endereço:</strong> ${f.endereco}</p>
            ${f.foto ? `<img src="${f.foto}" width="200" style="margin-top:5px;" />` : ''}
            </li>
            `).join('')}
        </ul>
        `;
    } else {
        fiscalizacoesHtml = '<p><em>Nenhuma fiscalização registrada.</em></p>';
    }
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: `Detalhes da Obra: ${obra.nome}`,
        html: `
        <h1>Detalhes da Obra</h1>
        <h2>${obra.nome}</h2>
        <p><strong>Responsável:</strong> ${obra.responsavel}</p>
        <p><strong> Data de Início:</strong> ${obra.dataInicio.toLocaleDateString()}</p>
        <p><strong> Previsão de Término:</strong> ${obra.dataFim.toLocaleDateString()}</p>
        <p><strong>Localização:${obra.endereco}</p>
        <p><strong>Descrição:</strong> ${obra.descricao || 'Nenhuma descrição fornecida'}</p>
        ${obra.foto ? `<img src="${obra.foto}" alt="Foto da Obra" width="300">` : ''}
        <hr />
        ${fiscalizacoesHtml}
        `
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
