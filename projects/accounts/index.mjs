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
      if (action === "Criar Conta") {
        createAccount();
      } else if (action === "Consultar Saldo") {
        getAccountBalance();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"));
        process.exit();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
operation();
const createAccount = () => {
  console.log(chalk.bgGreen.black("Obrigado por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir:"));
  buildAccount();
};
const buildAccount = () => {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      console.info(accountName);
      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Essa conta já existe! Escolha outro nome:")
        );
        buildAccount();
        return;
      }
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance":0}',
        (error) => {
          console.log(error);
        }
      );
      console.log(chalk.green("Parabéns! Sua conta foi criada!"));
      operation();
    })
    .catch((error) => {
      console.log(error);
    });
};
const deposit = () => {
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
        return deposit();
      }
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
          operation();
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
const checkAccount = (accountName) => {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Essa conta não existe! Digite outro nome."));
    return false;
  }
  return true;
};
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
const getAccount = (accountName) => {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });
  return JSON.parse(accountJSON);
};
const getAccountBalance = () => {
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
        return getAccountBalance();
      }
      const account = getAccount(accountName);
      console.log(chalk.bgBlue.black(`Seu saldo é de R$ ${account.balance}.`));
      operation();
    })
    .catch((error) => {
      console.log(error);
    });
};
