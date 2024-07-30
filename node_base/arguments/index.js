const soma = require("./soma.js");
const minimist = require("minimist");
const args = minimist(process.argv.slice(2));
const a = parseInt(args["a"]);
const b = parseInt(args["b"]);
soma(a, b);
