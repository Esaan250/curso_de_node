import chalk from "chalk";
const args = process.argv.slice(2);
const argument = args[0];
if (argument >= 5) {
  console.log(chalk.green("Você foi aprovado!"));
} else {
  console.log(chalk.red("Vixe! Tá reprovado!"));
}
