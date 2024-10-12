import express from "express";
import exphbs from "express-handlebars";
import connection from "./db/connection.mjs";
import usersRoutes from "./routes/usersRoutes.mjs";
const app = express();
const gateway = 3000;
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use("/", usersRoutes);
connection
  .sync()
  .then(() => {
    app.listen(gateway);
  })
  .catch((error) => {
    console.log(error);
  });
