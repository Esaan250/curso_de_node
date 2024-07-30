import http from "http";
import url from "url";

const porta = 3000;
const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true);
  const name = urlInfo.query.name;
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (!name) {
    res.end(
      "<h1>Preencha seu nome:</h1><form method='get'><input type='text' name='name'/><input type='submit'/>"
    );
  } else {
    res.end(`<h1>Seja bem-vindo, ${name}!`);
  }
});
server.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}.`);
});
