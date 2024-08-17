import inquirer from "inquirer";
import removeAmount from "./removeAmount.mjs";

const withdraw = (accountName) => {
  inquirer
    .prompt([
      {
        name: "amount",
        message: "Quanto quer sacar?",
      },
    ])
    .then((answer) => {
      const amount = answer["amount"];
      removeAmount(accountName, amount);
    })
    .catch((error) => {
      console.log(error);
    });
};
export default withdraw;
