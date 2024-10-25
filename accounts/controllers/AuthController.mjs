import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
export default class UserController {
  static login(req, res) {
    res.render("auth/login");
  }
  //   static async loginPost(req, res) {
  //     const { email, password } = req.body;
  //     // find user
  //     const user = await User.findOne({ where: { email: email } });
  //     if (!user) {
  //       res.render("auth/login", {
  //         message: "Usuário não encontrado!",
  //       });
  //       return;
  //     }
  //     // compare password
  //     const passwordMatch = bcrypt.compareSync(password, user.password);
  //     if (!passwordMatch) {
  //       res.render("auth/login", {
  //         message: "Senha inválida!",
  //       });
  //       return;
  //     }
  //     // auth user
  //     req.session.userid = user.id;

  //     req.flash("message", "Login realizado com sucesso!");

  //     req.session.save(() => {
  //       res.redirect("/");
  //     });
  //   }
}
