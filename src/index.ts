import express from 'express';

const app = express();
const port = 3000;

app.get('/api/:taskText', (req, res) => {
  const data = req.params.taskText;
  res.send(`Texte de la tâche reçu : ${data}`);
});

const server = app.listen(port, () => {
  console.log(`API en écoute sur http://localhost:${port}`);
});

export { server };