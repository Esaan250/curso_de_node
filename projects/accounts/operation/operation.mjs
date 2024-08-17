import inquirer from "inquirer";
import getAccountBalance from "../getAccountBalance/getAccountBalance.mjs";
import deposit from "../deposit/deposit.mjs";
import withdraw from "../withdraw/withdraw.mjs";
import chalk from "chalk";

const operation = (username) => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que deseja fazer?",
        choices: ["Consultar Saldo", "Depositar", "Sacar", "Sair"],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      if (action === "Consultar Saldo") {
        getAccountBalance(username);
      } else if (action === "Depositar") {
        deposit(username);
      } else if (action === "Sacar") {
        withdraw(username);
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"));
        process.exit();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export default operation;
