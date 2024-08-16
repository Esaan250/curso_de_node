import chalk from "chalk";
import fs from "fs";
const checkAccount = (accountName) => {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Essa conta não existe! Digite outro nome."));
    return false;
  }
  return true;
};
export default checkAccount;
