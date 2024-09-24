import express from "express";
import exphbs from "express-handlebars";
import pool from "./db/connection.mjs";

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
app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  pool.query(sql, (error, data) => {
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
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ["id", id];
  pool.query(sql, data, (error, data) => {
    if (error) {
      res.redirect("/");
      console.log(error);
    } else {
      const book = data[0];
      res.render("book", { book });
    }
  });
});
app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ["id", id];
  pool.query(sql, data, (error, data) => {
    if (error) {
      console.log(error);
      return;
    } else {
      const book = data[0];
      res.render("editBook", { book });
    }
  });
});
app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pagesqty = req.body.pagesqty;
  const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`;
  const data = ["title", "pageqty", title, pagesqty];
  pool.query(sql, data, (error) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/");
    }
  });
});
app.post("/books/updatebook", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pagesqty = req.body.pagesqty;
  const sql = `UPDATE books SET title = '${title}', pageqty = '${pagesqty}' WHERE id = ${id}`;
  pool.query(sql, (error, data) => {
    if (error) {
      console.log(error);
      return;
    } else {
      res.redirect("/books");
    }
  });
});
app.post("/books/remove/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM books WHERE id = ${id}`;
  pool.query(sql, (error) => {
    if (error) {
      console.log(error);
      return;
    } else {
      res.redirect("/books");
    }
  });
});
app.listen(3000, () => {
  console.log("Servidor conectado.");
});
