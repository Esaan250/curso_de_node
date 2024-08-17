import inquirer from "inquirer";
import addAmount from "./addAmount.mjs";
import operation from "../operation/operation.mjs";
const deposit = (accountName) => {
  inquirer
    .prompt([
      {
        name: "amount",
        message: "Quanto deseja depositar?",
      },
    ])
    .then((answer) => {
      const amount = answer["amount"];
      addAmount(accountName, amount);
      operation(accountName);
    })
    .catch((error) => {
      console.log(error);
    });
};
export default deposit;
