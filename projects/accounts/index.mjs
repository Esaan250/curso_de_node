import chalk from "chalk";
import inquirer from "inquirer";
import createAccount from "./account/createAccount.mjs";
import login from "./account/login.mjs";
const entryAccount = () => {
  console.log(chalk.green("Seja bem-vindo ao Accounts!"));
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que deseja fazer?",
        choices: ["Fazer Login", "Criar Conta", "Sair"],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      if (action === "Fazer Login") {
        login();
      } else if (action === "Criar Conta") {
        createAccount();
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"));
        process.exit();
      }
    });
};
entryAccount();

export default entryAccount;
