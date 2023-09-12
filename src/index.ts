import express from 'express';
import bodyParser from 'body-parser'; // Ajout du "middleware" bodyParser pour eviter de parseint toute les lignes (conseil trouver sur le net pour la netete du code)
import { DestroyTask, addTask, getAllTasks, updateTask,DestroyAll } from './sequelize'; // Importez les fonctions de votre fichier sequelize.js
import { todo } from 'node:test';

const port = 3000;
const app = express();

app.use(bodyParser.json()); // ceci permet d'eviter de "parseint" chaque données, app.use permet "d'activer" un middleware

app.post('/api/add', (req, res) => {
  const newData = req.body;
  addTask(newData) // Utilisez la fonction addtask
    .then(() => {
      res.json({ message: 'Données ajoutées avec succès' });
    })
    .catch((error) => {
      console.error('Erreur lors de l\'ajout de la tâche :', error);  //permet de faire un "console log" avec un "appuie" sur error
      res.status(500).json({ error: 'Erreur lors de l\'ajout de la tâche.' }); //si erreur 500 alors...
    });
});

app.get('/api/data', (req, res) => {
  getAllTasks() // Utilisez la fonction pour récupérer toutes les tâches
    .then((dataStore) => {
      res.json(dataStore);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des tâches :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des tâches.' });
    });
});

app.put('/api/update/:id/:actif', (req, res) => { // utiliser put car c'est une maj
  const idParam = req.params.id;
  const actifParam = req.params.actif;
  const id = parseInt(idParam);

  if (!isNaN(id)) { //NAN = not a number
    const actif = JSON.parse(actifParam);
    updateTask(id, actif) // Utilisez la fonction pour mettre à jour la tâche
      .then((updatedTask) => {
        console.log(`L'état de la tâche pour l'ID ${id} a été mis à jour.`);
        res.status(200).json(updatedTask); // si erreur 200 alors... ("erreur" 200 veut juste dire que la requete a recu un "ok")
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche.' });
      });
  } else {
    console.error('L\'ID n\'est pas un nombre valide.');
    res.status(400).json({ error: 'L\'ID n\'est pas un nombre valide.' });
  }
});

app.put('/api/remove/:id', (req, res) => { // utiliser put car c'est une maj
  const idParam = req.params.id;
  const id = parseInt(idParam);

  if (!isNaN(id)) { //NAN = not a number
    DestroyTask(id) // Utilisez la fonction pour supprimer la tâche
      .then((destroyedTask) => {
        console.log(`L'état de la tâche pour l'ID ${id} a été supprimé.`);
        res.status(200).json(destroyedTask); // si erreur 200 alors... ("erreur" 200 veut juste dire que la requete a recu un "ok")
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche.' });
      });
  } else {
    console.error('L\'ID n\'est pas un nombre valide.');
    res.status(400).json({ error: 'L\'ID n\'est pas un nombre valide.' });
  }
});

app.get('/api/DeleteAll', async (req: express.Request, res: express.Response) => {
  DestroyAll()
  .then((destroyedAll) => {
    console.log(`toutes les données ont été supprimé.`);
    res.status(200).json(destroyedAll); // si erreur 200 alors... ("erreur" 200 veut juste dire que la requete a recu un "ok")
  })
  .catch((error) => {
    console.error('Erreur lors de la supression des tâches :', error);
    res.status(500).json({ error: 'Erreur lors de la supression tâches.' });
  });
});

const server = app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
