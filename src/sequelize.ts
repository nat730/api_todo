  import { DataTypes, Sequelize } from "sequelize";
  import { server } from "./index";

  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
  });

  const Todo = sequelize.define("Todo", {
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

