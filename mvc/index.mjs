import express from "express";
import exphbs from "express-handlebars";
import Task from "./models/Task.mjs";
import connection from "./db/connection.mjs";
const app = express();
app.engine(".hbs", exphbs.engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
connection
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
