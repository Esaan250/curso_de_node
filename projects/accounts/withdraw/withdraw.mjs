import inquirer from "inquirer";
import removeAmount from "./removeAmount.mjs";
import checkAccount from "../checkAccount/checkAccount.mjs";

const withdraw = () => {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        return withdraw();
      }
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
    })
    .catch((error) => {
      console.log(error);
    });
};
export default withdraw;
