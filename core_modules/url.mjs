import url from "url";
const adress = "https://www.meusite.com.br/catalog?produtos=cadeira";
const parsedUrl = new url.URL(adress);

// 1 - AVERIGUAR ENDEREÇO DA URL

console.log(parsedUrl.host);

// 2 - AVERIGUAR CAMINHO ESCOLHIDO

console.log(parsedUrl.pathname);

// 3 - AVERIGUAR A BUSCA FEITA

console.log(parsedUrl.search);

// 4 - AVERIGUAR PARÂMETROS DE BUSCA (CATEGORIA > ITEM DA CATEGORIA)

console.log(parsedUrl.searchParams);

// 5 - AVERIGUAR ITEM DA CATEGORIA REQUISITADA NA BUSCA

console.log(parsedUrl.searchParams.get("produtos"));
