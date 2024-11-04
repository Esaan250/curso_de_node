import Bank from "../models/Bank.mjs";
export default class bankController {
  static async homePage(req, res) {
    const userId = req.session.userid;
    const bank = await Bank.findOne({
      where: {
        UserId: userId,
      },
    });
    const balance = bank.balance;
    res.render("operations/homepage", { balance });
  }
  static depositPage(req, res) {
    res.render("operations/deposit");
  }
  static async depositPost(req, res) {
    try {
      const depositValue = parseFloat(req.body.balance);
      const userId = req.session.userid;

      console.log("User ID:", userId); // Log do ID do usuário

      let bankAccount = await Bank.findOne({ where: { UserId: userId } });

      console.log("Bank Account:", bankAccount); // Log da conta encontrada

      if (!bankAccount) {
        req.flash("message", "Conta não encontrada.");
        return res.redirect("/deposit");
      }

      bankAccount.balance += depositValue;

      await bankAccount.save();

      req.flash("message", "Depósito realizado com sucesso.");
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.error(error);
      req.flash("message", "Erro ao processar o depósito.");
      res.redirect("/deposit");
    }
  }
  static transferPage(req, res) {
    res.render("operations/transfer");
  }
  static async transferPost(req, res) {
    const senderId = req.session.userid; // ID da conta remetente
    const recipientId = req.body.userid; // ID da conta destinatária
    const amount = req.body.amount;
    try {
      const transferAmount = parseFloat(amount);
      // Busca as contas do remetente e do destinatário
      let senderAccount = await Bank.findOne({ where: { UserId: senderId } });
      let recipientAccount = await Bank.findOne({
        where: { UserId: recipientId },
      });

      if (!senderAccount) {
        console.log("Conta do remetente não encontrada.");
        return res.redirect("/transfer");
      }

      if (!recipientAccount) {
        console.log("Conta do destinatário não encontrada.");
        return res.redirect("/transfer");
      }

      // Verifica se o remetente tem saldo suficiente
      if (senderAccount.balance < transferAmount) {
        console.log("Saldo insuficiente para transferência.");
        return res.redirect("/transfer");
      }

      // Atualiza os saldos
      senderAccount.balance -= transferAmount;
      recipientAccount.balance += transferAmount;

      // Salva as atualizações nas contas
      await senderAccount.save();
      await recipientAccount.save();

      console.log("Transferência realizada com sucesso.");
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(`Erro ao processar a transferência: ${error}`);
      res.redirect("/transfer");
    }
  }
  static withdrawPage(req, res) {
    res.render("operations/withdraw");
  }
  static async withdrawPost(req, res) {
    const userid = req.session.userid;
    const amount = req.body.amount;
    const withdraw = parseFloat(amount);
    try {
      const userAccount = await Bank.findOne({ where: { UserId: userid } });
      if (!userAccount) {
        console.log("Conta não encontrada.");
        return res.redirect("/withdraw");
      }
      if (userAccount.balance < withdraw) {
        console.log("Saldo insuficiente para sacar.");
        return res.redirect("/withdraw");
      }
      userAccount.balance -= withdraw;
      await userAccount.save();
      console.log("Saque realizado com sucesso.");
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(`Falha na operação: ${error}`);
    }
  }
}
