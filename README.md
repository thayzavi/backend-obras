# 🏗️ Backend - Cadastro e Acompanhamento de Obras

Este é o backend de uma aplicação mobile para **gerenciamento de obras e fiscalizações**, desenvolvido com **Node.js, Express, MongoDB Atlas e Mongoose**, com suporte a **upload de imagem (base64 ou URL)** e **envio de email com Nodemailer**.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose](https://mongoosejs.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)

---
## Instalação

```bash
git clone ...
cd backend-obras
npm install
npm run dev
````
Configure as variáveis de ambiente
```
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/obrasdb?retryWrites=true&w=majority
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=sua_senha_de_app_do_gmail
```
