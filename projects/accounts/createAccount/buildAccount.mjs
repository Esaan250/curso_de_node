import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import operation from "../index.mjs";

const buildAccount = () => {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      console.info(accountName);
      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Essa conta já existe! Escolha outro nome:")
        );
        buildAccount();
        return;
      }
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance":0}',
        (error) => {
          console.log(error);
        }
      );
      console.log(chalk.green("Parabéns! Sua conta foi criada!"));
      operation();
    })
    .catch((error) => {
      console.log(error);
    });
};
export default buildAccount;
