import express from 'express';
import Sequelize from './sequelize';
const app = express();
const port = 3000;

app.get('/api/:data', (req, res) => {
  const data = req.params.data;
  res.send(`Bonjour ${data}`);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

Sequelize.sync()
  .then(() => {
    console.log('Base de données synchronisée avec succès.');
  })
  .catch((erreur) => {
    console.error('Erreur lors de la synchronisation de la base de données :', erreur);
  });
