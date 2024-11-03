import User from "../models/User.mjs";
import Bank from "../models/Bank.mjs";
import bcrypt from "bcryptjs";
export default class UserController {
  static loginPage(req, res) {
    res.render("auth/login");
  }
  static registerPage(req, res) {
    res.render("auth/register");
  }
  static async loginPost(req, res) {
    const { email, password } = req.body;
    // find user
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.render("auth/login", {
        message: "Usuário não encontrado!",
      });
      return;
    }
    // compare password
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      res.render("auth/login", {
        message: "Senha inválida!",
      });
      return;
    }
    // auth user
    req.session.userid = user.id;

    req.flash("message", "Login realizado com sucesso!");

    req.session.save(() => {
      res.redirect("/");
    });
  }
  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;
    // passwords match validation
    if (password != confirmpassword) {
      req.flash("message", "As senhas não conferem, tente novamente!");
      res.render("auth/register");
      return;
    }
    // email validation
    const checkIfUserExists = await User.findOne({ where: { email: email } });
    if (checkIfUserExists) {
      req.flash("message", "O e-mail já está em uso!");
      res.render("auth/register");

      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = {
      name,
      email,
      password: hashedPassword,
    };

    // Criar uma conta bancária para o novo usuário
    try {
      // Criação do usuário
      const newUser = await User.create(user);

      // Criar uma conta bancária para o novo usuário
      await Bank.create({ UserId: newUser.id, balance: 0 });

      // Inicializa a sessão
      req.session.userid = newUser.id;

      req.flash("message", "Cadastro realizado com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.error(err);
      req.flash("message", "Erro ao registrar o usuário.");
      res.render("auth/register");
    }
  }
  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
}
