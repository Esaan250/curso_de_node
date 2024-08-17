import fs from "fs";
import chalk from "chalk";
import getAccount from "../getAccount/getAccount.mjs";
import withdraw from "./withdraw.mjs";
import operation from "../operation/operation.mjs";

const removeAmount = (accountName, amount) => {
  const account = getAccount(accountName);
  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro! Tente novamente mais tarde...")
    );
    return withdraw();
  }
  if (account.balance < amount) {
    console.log(chalk.bgRed.black("Valor indisponível!"));
  }
  account.balance = parseFloat(account.balance) - parseFloat(amount);
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(account),
    (error) => {
      console.log(error);
    }
  );
  console.log(chalk.green(`Saque de R$ ${amount} realizado com sucesso.`));
  operation(accountName);
};
export default removeAmount;
