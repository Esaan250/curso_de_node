// AULA 1 - CRIANDO SERVIDOR COM MÓDULO HTTP DO NODE

// import http from "http";
// const porta = 3000;
// const server = http.createServer((req, res) => {
//   res.write("Oi, HTTP");
//   res.end();
// });
// server.listen(porta, () => {
//   console.log(`Servidor rodando na porta ${porta}.`);
// });

// AULA 2 - RETORNANDO HTML COM UTF-8

// import http from "http";
// const porta = 3000;
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html; charset=utf-8");
//   res.end("<h1>Servidor capaz de enviar conteúdo HTML.</h1>");
// });
// server.listen(porta, () => {
//   console.log(`Servidor rodando na porta ${porta}.`);
// });
