const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Disciplinas está rodando!' });
});

app.get('/disciplinas', (req, res) => {
    const { nome } = req.query;
  
    if (nome) {
      const resultado = disciplinas.filter(d => d.nome.toLowerCase().includes(nome.toLowerCase()));
      res.json(resultado);
    } else {
      res.json(disciplinas);
    }
  });
  
app.post('/disciplinas', (req, res) => {
    const { nome, cargaHoraria, obrigatoria } = req.body;
  
    if (!nome || !cargaHoraria || obrigatoria === undefined) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios: nome, cargaHoraria e obrigatoria.' });
    }
  
    const novaDisciplina = {
      id: uuidv4(),
      nome,
      cargaHoraria,
      obrigatoria
    };
  
    disciplinas.push(novaDisciplina);
  
    res.status(201).json(novaDisciplina);
  });  

app.get('/disciplinas/:id', (req, res) => {
  const { id } = req.params;
  const disciplina = disciplinas.find(d => d.id === id);

  if (!disciplina) {
    return res.status(404).json({ mensagem: 'Disciplina não encontrada' });
  }

  res.json(disciplina);
});

app.put('/disciplinas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cargaHoraria, obrigatoria } = req.body;
  
    const indice = disciplinas.findIndex(d => d.id === id);
  
    if (indice === -1) {
      return res.status(404).json({ mensagem: 'Disciplina não encontrada' });
    }
  
    if (!nome || !cargaHoraria || obrigatoria === undefined) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios: nome, cargaHoraria e obrigatoria.' });
    }
  
    disciplinas[indice] = {
      id,
      nome,
      cargaHoraria,
      obrigatoria
    };
  
    res.json(disciplinas[indice]);
  });

app.put('/disciplinas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cargaHoraria, obrigatoria } = req.body;
  
    const index = disciplinas.findIndex(d => d.id === id);
  
    if (index === -1) {
      return res.status(404).json({ mensagem: 'Disciplina não encontrada' });
    }
  
    disciplinas[index] = {
      ...disciplinas[index],
      nome: nome || disciplinas[index].nome,
      cargaHoraria: cargaHoraria || disciplinas[index].cargaHoraria,
      obrigatoria: obrigatoria !== undefined ? obrigatoria : disciplinas[index].obrigatoria
    };
  
    res.json(disciplinas[index]);
  });  

app.delete('/disciplinas/:id', (req, res) => {
  const { id } = req.params;
  const index = disciplinas.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Disciplina não encontrada' });
  }

  disciplinas.splice(index, 1);

  res.status(200).json({ mensagem: 'Disciplina removida com sucesso' });
});

const { v4: uuidv4 } = require('uuid');

let disciplinas = [];

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
