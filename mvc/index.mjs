import express from "express";
import { Router } from "express";
import exphbs from "express-handlebars";
import Task from "./models/Task.mjs";
import connection from "./db/connection.mjs";
import tasksRoutes from "./routes/tasksRoutes.mjs";
const app = express();
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/tasks", tasksRoutes);
connection
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
