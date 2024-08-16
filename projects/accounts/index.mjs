import chalk from "chalk";
import inquirer from "inquirer";
import createAccount from "./createAccount/createAccount.mjs";
import deposit from "./deposit/deposit.mjs";
import getAccountBalance from "./getAccountBalance/getAccountBalance.mjs";
import withdraw from "./withdraw/withdraw.mjs";
const operation = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      if (action === "Criar Conta") {
        createAccount();
      } else if (action === "Consultar Saldo") {
        getAccountBalance();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"));
        process.exit();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
operation();
export default operation;
