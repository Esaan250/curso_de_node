const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});
app.use(express.static("assets"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
const cellPhones = [
  {
    cellPhone: "Samsung Galaxy A32",
    ram: "6GB",
    storage: "128GB",
    camera: "64MPX",
    image: "/galaxyA32.jpg",
    link: "galaxyA32",
  },
  {
    cellPhone: "Nokia G60 5G",
    ram: "6GB",
    storage: "128GB",
    camera: "50MPX",
    image: "/nokiaG60.webp",
    link: "nokiaG60",
  },
  {
    cellPhone: "Motorola Edge 40 Neo",
    ram: "8GB",
    storage: "256GB",
    camera: "50MPX",
    image: "/motorolaMotoEdge.jpg",
    link: "motorolaMotoEdge",
  },
];
app.get("/", (req, res) => {
  res.render("home", {
    title: "Página Inicial",
    cellPhones,
    style: "home.css",
  });
});
app.get("/home", (req, res) => {
  res.render("home", {
    title: "Página Inicial",
    cellPhones,
    style: "home.css",
  });
});
app.get("/:link", (req, res) => {
  const { link } = req.params;
  const product = cellPhones.find((p) => p.link === link);
  if (product) {
    res.render("cellPhone", {
      product,
      title: product.cellPhone,
      style: "cellPhone.css",
    });
  } else {
    res.status(404).send("Produto não encontrado");
  }
});
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
});
