import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import sessionFileStore from "session-file-store";
import { join } from "path";
import os from "os";
const osTmpDir = os.tmpdir();
const FileStore = sessionFileStore(session);
import flash from "express-flash";
import db from "./db/connection.mjs";
import Tought from "./models/Tought.mjs";
import User from "./models/User.mjs";
import toughtRoutes from "./routes/toughtsRoutes.mjs";
import ToughtsControllers from "./controllers/ToughtsController.mjs";
const app = express();
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    name: "session",
    secret: "nosso_segredo",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => {},
      path: join(osTmpDir, "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);
app.use(flash());
app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }
  next();
});
app.use("/toughts", toughtRoutes);
app.get("/", ToughtsControllers.showToughts);
db.sync()
  .then(() => {
    app.listen(3000);
    console.log("Servidor 3000 iniciado.");
  })
  .catch((error) => {
    console.log(error);
  });
