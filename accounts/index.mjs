import express from "express";
const app = express();
import exphbs from "express-handlebars";
import session from "express-session";
const FileStore = sessionFileStore(session);
import sessionFileStore from "session-file-store";
import flash from "express-flash";
import { join } from "path";
import os from "os";
const osTmpDir = os.tmpdir();
import conn from "./db/connection.mjs";
import bankRoutes from "./routes/bankRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import bankController from "./controllers/bankController.mjs";
import Bank from "./models/Bank.mjs";

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

//session middleware
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => {},
      path: join(osTmpDir, "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  })
);

// flash messages
app.use(flash());

app.use(express.static("public"));

// set session to res
app.use((req, res, next) => {
  // console.log(req.session)
  console.log(req.session.userid);

  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

app.use("/", bankRoutes);
app.use("/", authRoutes);

app.get("/", bankController.homePage);

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
