import chalk from "chalk";
import inquirer from "inquirer";
import getAccount from "../getAccount/getAccount.mjs";
import checkAccount from "../checkAccount/checkAccount.mjs";
import operation from "../index.mjs";

const getAccountBalance = () => {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }
      const account = getAccount(accountName);
      console.log(chalk.bgBlue.black(`Seu saldo é de R$ ${account.balance}.`));
      operation();
    })
    .catch((error) => {
      console.log(error);
    });
};
export default getAccountBalance;
