import express from "express";
import checkAuth from "./helpers/auth.mjs";
import connection from "./db/connection.mjs";
import exphbs from "express-handlebars";
import session from "express-session";
import sessionFileStore from "session-file-store";
const FileStore = sessionFileStore(session);
import flash from "express-flash";
import operationsRoutes from "./routes/operationsRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import OperationsController from "./controllers/bankOperationsController.mjs";
const app = express();
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/operations", operationsRoutes);
app.use("/", authRoutes);
app.get("/", checkAuth, OperationsController.operationsPage);
connection
  .sync()
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
