const express = require("express");
const path = require("path");
const router = express.Router();
const templatesPath = path.join(__dirname, "../templates");
router.get("/", (req, res) => {
  res.sendFile(path.join(templatesPath, "/login.html"));
});
router.get("/login", (req, res) => {
  res.sendFile(path.join(templatesPath, "/login.html"));
});
router.get("/cadastro", (req, res) => {
  res.sendFile(path.join(templatesPath, "/cadastro.html"));
});
module.exports = router;
