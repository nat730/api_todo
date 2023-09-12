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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestroyAll = exports.DestroyTask = exports.updateTask = exports.getAllTasks = exports.addTask = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('nom_de_la_base_de_donnees', 'utilisateur', 'mot_de_passe', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Vous pouvez désactiver les journaux Sequelize si vous le souhaitez
});
const Todo = sequelize.define('Todo', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    timestamps: false,
});
// Fonctions pour interagir avec la base de données
// Fonction pour ajouter une tâche
function addTask(newData) {
    return __awaiter(this, void 0, void 0, function* () {
        return Todo.create(newData);
    });
}
exports.addTask = addTask;
// Fonction pour récupérer toutes les tâches
function getAllTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        return Todo.findAll();
    });
}
exports.getAllTasks = getAllTasks;
// Fonction pour mettre à jour une tâche
function updateTask(id, actif) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Todo.update({ status: actif }, { where: { id } });
        return Todo.findOne({ where: { id } });
    });
}
exports.updateTask = updateTask;
function DestroyTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Todo.destroy({ where: { id } });
    });
}
exports.DestroyTask = DestroyTask;
function DestroyAll() {
    return __awaiter(this, void 0, void 0, function* () {
        Todo.destroy({ where: {},
            truncate: true });
    });
}
exports.DestroyAll = DestroyAll;
exports.default = sequelize;
sequelize.query("DELETE FROM sqlite_sequence WHERE name='Todo'");
//# sourceMappingURL=sequelize.js.map