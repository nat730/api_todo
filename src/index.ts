import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';

const port = 3000;
const app = express();

app.get('/api/:nom', (req, res) => {
  const data = req.params.nom;
  const completed = Boolean
  Todo.create({ name: data, status: false, check:completed });
  res.send(`Texte de la tâche reçu : ${data}`);
});

app.put('/api/update/:id/:actif', async (req, res) => {
  const idParam = req.params.id;
  const actifParam = req.params.actif;
  const id = parseInt(idParam);

  if (!isNaN(id)) {
    try {
      const actif = JSON.parse(actifParam);

      // Mettez à jour la tâche dans votre base de données avec le nouvel état actif
      await Todo.update({ status: actif }, { where: { id } });

      // Récupérez la tâche mise à jour depuis la base de données
      const updatedTask = await Todo.findOne({ where: { id } });

      console.log(`L'état de la tâche pour l'ID ${id} a été mis à jour.`);
      res.status(200).json(updatedTask); // Retournez la tâche mise à jour au client
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche.' });
    }
  } else {
    console.error('L\'ID n\'est pas un nombre valide.');
    res.status(400).json({ error: 'L\'ID n\'est pas un nombre valide.' });
  }
});


const server = app.listen(port, () => {
  console.log(`API en écoute sur http://localhost:${port}`);
});

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
});

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
}, {
  timestamps: false,
});


sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Synchronisation de la base de données réussie.');
    Todo.create({
      name: "Tâche 1",
      status: true,
    })
    .then((todo) => {
      console.log("Tâche créée :", todo.get());
      Todo.findAll().then((todos) => {
        console.log("Toutes les tâches :", todos.map(todo => todo.get()));
      });
    });
  })
  .catch(error => {
    console.error('Erreur de synchronisation :', error);
  });