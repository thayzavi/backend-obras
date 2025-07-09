const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();

const Obra  = require('../models/Obra');
const Fiscalizacao = require('../models/Fiscalizacao');


const modelId = 'deepseek/deepseek-chat'; 

router.post('/', async (req, res) => {
  const { pergunta } = req.body;

  try {

    const obras = await Obra.find().limit(5);
    const fiscalizacoes = await Fiscalizacao.find().limit(5).populate('obra');

    const obrasTexto = obras.map(o => {
        return `- Obra ${o.nome}, endereço: ${o.endereco}, responsável: ${o.responsavel}, Data início: ${o.dataInicio?.toISOString()?.split('T')[0]}, Data fim: ${o.dataFim?.toISOString()?.split('T')[0]}`;
    }).join('\n');

    const fiscalizacoesTexto = fiscalizacoes.map(f => {
        return `- Fiscalização na obra ${f.obra}, por ${f.fiscalizacao}, em ${f.data?.toISOString()?.split('T')[0]}`;
    }).join('\n');

    const prompt = `
        Você é um assistente inteligente de um sistema de obras e fiscalizações.
            

           📍 Obras:
           ${obrasTexto || 'Nenhuma obra encontrada.'} 

           🕵️‍♂️ Fiscalizações:
           ${fiscalizacoesTexto || 'Nenhuma fiscalização registrada'}
            
        "${pergunta}"
    
    Responda com cllareza e base nos dados acima.
`;

    // Realizando a requisição para o modelo de IA
    const resposta = await axios.post(
        `https://openrouter.ai/api/v1/chat/completions`,
        {
        model: modelId,
        messages: [
        {
            role: 'user',
            content: prompt,
        },
            ],
            max_tokens: 1000,
            temperature: 0.7,
        },
        {
            headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            },
        }
    );

     // Obter a resposta do modelo
    const respostaTexto =resposta.data?.choices?.[0]?.message?.content || 'Desculpe, não consegui compreender sua mensagem. Você pode reformular?';

    // Retornar a resposta
    res.json({ resposta: respostaTexto });

  } catch (erro) {
    console.error(erro.response?.data || erro.message);
    res.status(500).json({ erro: "Erro ao consultar o modelo. Tente novamente mais tarde." });
  }
});

module.exports = router;
