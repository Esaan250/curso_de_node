const express = require("express");
const router = require("./routes/routes.js");
const app = express();
const gateway = 5000;
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.listen(gateway, () => {
  console.log(`Servidor rodando na porta ${gateway}`);
});
