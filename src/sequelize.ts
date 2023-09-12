import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
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
        truncate: true} )
}

export default sequelize;
sequelize.query("DELETE FROM sqlite_sequence WHERE name='Todo'");
