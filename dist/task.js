"use strict";
// models/task.js (par exemple)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize")); // Importez votre instance Sequelize
const Task = sequelize_2.default.define('Task', {
    // Définissez les colonnes de votre modèle Task ici
    taskText: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Exemple de contrainte
    },
    // Ajoutez d'autres colonnes ici en fonction de vos besoins
});
exports.default = Task;
