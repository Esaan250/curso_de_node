import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import operation from "../operation/operation.mjs";

const login = () => {
  inquirer
    .prompt([
      {
        name: "name",
        message: "Qual o seu nome?",
      },
    ])
    .then((answer) => {
      const name = answer["name"];
      if (!fs.existsSync(`accounts/${name}.json`)) {
        console.log(
          chalk.bgRed.black("Essa conta não existe! Digite outro nome:")
        );
        return login();
      } else {
        console.log(chalk.green(`É bom te ver de volta, ${name}!`));
        operation(name);
      }
    });
};
export default login;
