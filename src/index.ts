import express from "express";
const app = express();
const port = 3000;

app.get('/api/:data', (req, res) => {
  const data = req.params.data;
  res.send(`Bonjour ${data}`);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
