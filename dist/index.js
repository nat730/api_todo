"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser")); // Ajout du "middleware" bodyParser pour eviter de parseint toute les lignes (conseil trouver sur le net pour la netete du code)
const sequelize_1 = require("./sequelize"); // Importez les fonctions de votre fichier sequelize.js
const port = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json()); // ceci permet d'eviter de "parseint" chaque données, app.use permet "d'activer" un middleware
app.get('/api/add/${taskText}', (req, res) => {
    const newData = req.body;
    (0, sequelize_1.addTask)(newData) // Utilisez la fonction addtask
        .then(() => {
        res.json({ message: 'Données ajoutées avec succès' });
    })
        .catch((error) => {
        console.error('Erreur lors de l\'ajout de la tâche :', error); //permet de faire un "console log" avec un "appuie" sur error
        res.status(500).json({ error: 'Erreur lors de l\'ajout de la tâche.' }); //si erreur 500 alors...
    });
});
app.get('/api/data', (req, res) => {
    (0, sequelize_1.getAllTasks)() // Utilisez la fonction pour récupérer toutes les tâches
        .then((dataStore) => {
        res.json(dataStore);
    })
        .catch((error) => {
        console.error('Erreur lors de la récupération des tâches :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches.' });
    });
});
app.get('/', (req, res) => {
    (0, sequelize_1.getAllTasks)() // Utilisez la fonction pour récupérer toutes les tâches
        .then((dataStore) => {
        res.json(dataStore);
    })
        .catch((error) => {
        console.error('Erreur lors de la récupération des tâches :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches.' });
    });
});
app.put('/api/update/:id/:actif', (req, res) => {
    const idParam = req.params.id;
    const actifParam = req.params.actif;
    const id = parseInt(idParam);
    if (!isNaN(id)) { //NAN = not a number
        const actif = JSON.parse(actifParam);
        (0, sequelize_1.updateTask)(id, actif) // Utilisez la fonction pour mettre à jour la tâche
            .then((updatedTask) => {
            console.log(`L'état de la tâche pour l'ID ${id} a été mis à jour.`);
            res.status(200).json(updatedTask); // si erreur 200 alors... ("erreur" 200 veut juste dire que la requete a recu un "ok")
        })
            .catch((error) => {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche.' });
        });
    }
    else {
        console.error('L\'ID n\'est pas un nombre valide.');
        res.status(400).json({ error: 'L\'ID n\'est pas un nombre valide.' });
    }
});
app.put('/api/remove/:id', (req, res) => {
    const idParam = req.params.id;
    const id = parseInt(idParam);
    if (!isNaN(id)) { //NAN = not a number
        (0, sequelize_1.DestroyTask)(id) // Utilisez la fonction pour supprimer la tâche
            .then((destroyedTask) => {
            console.log(`L'état de la tâche pour l'ID ${id} a été supprimé.`);
            res.status(200).json(destroyedTask); // si erreur 200 alors... ("erreur" 200 veut juste dire que la requete a recu un "ok")
        })
            .catch((error) => {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche.' });
        });
    }
    else {
        console.error('L\'ID n\'est pas un nombre valide.');
        res.status(400).json({ error: 'L\'ID n\'est pas un nombre valide.' });
    }
});
app.get('/api/DeleteAll', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sequelize_1.DestroyAll)()
        .then((destroyedAll) => {
        console.log(`toutes les données ont été supprimé.`);
        res.status(200).json(destroyedAll); // si erreur 200 alors... ("erreur" 200 veut juste dire que la requete a recu un "ok")
    })
        .catch((error) => {
        console.error('Erreur lors de la supression des tâches :', error);
        res.status(500).json({ error: 'Erreur lors de la supression tâches.' });
    });
}));
const server = app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map