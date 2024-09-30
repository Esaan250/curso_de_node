import express from "express";
import User from "./models/User.mjs";
import exphbs from "express-handlebars";
import connection from "./db/connection.mjs";
const gateway = 3000;
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("assets"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.get("/", (req, res) => {
  res.render("home");
});
connection
  .sync()
  .then(() => {
    app.listen(gateway);
  })
  .catch((error) => {
    console.log(error);
  });
