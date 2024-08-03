const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let avisos = [];

// Endpoint para obter todos os avisos
app.get('/avisos', (req, res) => {
    res.json(avisos);
});

// Endpoint para postar um novo aviso
app.post('/avisos', (req, res) => {
    const novoAviso = req.body;
    avisos.push(novoAviso);
    res.status(201).json(novoAviso);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
