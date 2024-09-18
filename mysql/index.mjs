import express from "express";
import exphbs from "express-handlebars";
import mysql from "mysql2";

const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});
const gateway = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("assets"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.get("/", (req, res) => {
  res.render("home");
});
// CRIAR CONEXÃO COM MYSQL
const connection = mysql.createConnection({
  // HOST É O ENDEREÇO
  host: "localhost",
  // USER É... CÊ JÁ SABE
  user: "esaansql",
  // PASSWORD TAMBÉM
  password: "@Edrampak250",
  // DATABASE É O BANCO AO QUAL VOCÊ QUER SE CONECTAR
  database: "sql_datapod",
});
connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Conectado!");
    app.listen(gateway);
  }
});
app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  connection.query(sql, (error, data) => {
    if (error) {
      console.log(error);
      return;
    } else {
      const books = data;
      console.log(books);
      res.render("books", { books });
    }
  });
});

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pagesqty = req.body.pagesqty;
  const sql = `INSERT INTO books (title,pageqty) VALUES ("${title}","${pagesqty}")`;
  connection.query(sql, (error) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/");
    }
  });
});
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  connection.query(sql, (error, data) => {
    if (error) {
      console.log(error);
      res.redirect("/");
    } else {
      const book = data[0];
      res.render("book", { book });
    }
  });
});
