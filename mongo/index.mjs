import express from "express";
import exphbs from "express-handlebars";
import connection from "./db/connection.mjs";
import productsRoutes from "./routes/productsRoutes.mjs";
const app = express();
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use("/", productsRoutes);
app.listen(3000);
