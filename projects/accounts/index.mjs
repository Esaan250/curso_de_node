import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";

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
      console.log(action);
    })
    .catch((error) => {
      console.log(error);
    });
};
operation();
