import chalk from "chalk";
import buildAccount from "./buildAccount.mjs";
const createAccount = () => {
  console.log(chalk.bgGreen.black("Obrigado por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir:"));
  buildAccount();
};
export default createAccount;
