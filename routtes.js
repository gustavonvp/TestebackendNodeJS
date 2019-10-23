const express = require("express");

const server = express();

server.use(express.json());

const tipoprojeto = [
  { id: "0", titulo: "Novo Projeto", tarefas: ["DVS", "TEST"] }
];

server.use((req, res, next) => {
  console.count(`Quantidade Requisições: ${req.tipoprojeto}`);

  next();
});

function verificaprojeto(req, res, next) {
  const projeto = tipoprojeto[req.params.id];

  if (!projeto) {
    return res.status(400).json({ error: "Projeto não existe!" });
  }

  req.projeto = projeto;

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(tipoprojeto);
});

server.get("/projects/:id", (req, res) => {
  return res.json(req.projeto);
});

server.post("/projects", (req, res) => {
  const { projeto } = req.body;

  tipoprojeto.push(projeto);

  return res.json(tipoprojeto);
});

server.put("/projects/:id", verificaprojeto, (req, res) => {
  const { id } = req.params;
  const { projeto } = req.body;

  tipoprojeto[id] = projeto;

  return res.json(tipoprojeto[id]);
});

server.delete("/projects/:id", verificaprojeto, (req, res) => {
  const { id } = req.params;
  const { projeto } = req.body;

  tipoprojeto.splice(id, 1);
  return res.json({ message: "Projeto Deletado com Sucesso!" });
});

server.listen(3003);
