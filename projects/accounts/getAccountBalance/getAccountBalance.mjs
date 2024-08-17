import chalk from "chalk";
import getAccount from "../getAccount/getAccount.mjs";
import operation from "../operation/operation.mjs";
const getAccountBalance = (accountName) => {
  const account = getAccount(accountName);
  console.log(chalk.bgBlue.black(`Seu saldo é de R$ ${account.balance}.`));
  operation(accountName);
};
export default getAccountBalance;
