import Bank from "../models/Bank.mjs";
import User from "../models/User.mjs";
import { Op } from "sequelize";
export default class bankController {
  static async homePage(req, res) {
    const userId = req.session.userid;
    const bank = await Bank.findOne({
      where: {
        UserId: userId,
      },
    });
    const balance = bank.balance;

    // const id = req.params.id;
    // const tought = await Tought.findOne({ where: { id: id }, raw: true });
    // res.render("toughts/edit", { tought });
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
    const recipient = req.body.userid;
    const amount = req.body.amount;
    try {
      const depositValue = parseFloat(amount);
      let bankAccount = await Bank.findOne({ where: { UserId: recipient } });
      if (!bankAccount) {
        console.log("Conta não encontrada. Tente novamente.");
        return res.redirect("/transfer");
      }
      bankAccount.balance += depositValue;
      await bankAccount.save();
      req.flash("message", "Depósito realizado com sucesso.");
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(`Erro ao processar o depósito: ${error}`);
      res.redirect("/transfer");
    }
  }
}
