import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize('nom_de_la_base_de_donnees', 'utilisateur', 'mot_de_passe', {
  host: 'localhost', // Remplacez par l'hôte de votre base de données PostgreSQL
  dialect: 'postgres', // Indiquez que vous utilisez PostgreSQL
  logging: false, // Vous pouvez désactiver les journaux Sequelize si vous le souhaitez
});

const Todo = sequelize.define('Todo', {
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

// Fonctions pour interagir avec la base de données

// Fonction pour ajouter une tâche
export async function addTask(newData: { name: string, status: boolean }) {
    return Todo.create(newData);
}

// Fonction pour récupérer toutes les tâches
export async function getAllTasks() {
    return Todo.findAll();
}

// Fonction pour mettre à jour une tâche
export async function updateTask(id: number, actif: boolean) {
    await Todo.update({ status: actif }, { where: { id } });
    return Todo.findOne({ where: { id } });
}

export async function DestroyTask(id: number) {
    await Todo.destroy({ where: { id } });
}

export async function DestroyAll() {
    Todo.destroy({where: {},
        truncate: true}  )
}

export default sequelize;
sequelize.query("DELETE FROM sqlite_sequence WHERE name='Todo'");
