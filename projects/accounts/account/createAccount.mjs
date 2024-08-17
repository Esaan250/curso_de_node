import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import entryAccount from "../index.mjs";

const createAccount = () => {
  console.log(chalk.bgGreen.black("Agradecemos por escolher o nosso banco!"));
  console.log(chalk.green("Siga os seguintes passos a seguir:"));
  inquirer
    .prompt([
      {
        name: "name",
        message: "Digite seu nome:",
      },
    ])
    .then((answer) => {
      const name = answer["name"];
      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }
      if (fs.existsSync(`accounts/${name}.json`)) {
        console.log(
          chalk.bgRed.black("Essa conta já existe! Escolha outro nome:")
        );
        createAccount();
        return;
      }
      fs.writeFileSync(`accounts/${name}.json`, '{"balance":0}', (error) => {
        console.log(error);
      });
      console.log(chalk.green(`Parabéns, ${name}! Sua conta foi criada!`));
      entryAccount();
    })
    .catch((error) => {
      console.log(error);
    });
};
export default createAccount;
