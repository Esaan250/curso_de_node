import fs from "fs";
import chalk from "chalk";
import getAccount from "../getAccount/getAccount.mjs";
const addAmount = (accountName, amount) => {
  const account = getAccount(accountName);
  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro. Tente novamente mais tarde.")
    );
    return deposit();
  }
  account.balance = parseFloat(amount) + parseFloat(account.balance);
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(account),
    (error) => {
      console.log(error);
    }
  );
  console.log(chalk.green(`Você depositou R$ ${amount} com sucesso!`));
};
export default addAmount;
