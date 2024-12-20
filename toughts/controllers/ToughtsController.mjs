import Tought from "../models/Tought.mjs";
import User from "../models/User.mjs";
import { Op } from "sequelize";
export default class ToughController {
  static async dashboard(req, res) {
    const userId = req.session.userid;
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Tought,
      plain: true,
    });
    const toughts = user.Toughts.map((result) => result.dataValues);
    let emptyToughts = true;
    if (toughts.length > 0) {
      emptyToughts = false;
    }
    console.log(toughts);
    console.log(emptyToughts);
    res.render("toughts/dashboard", { toughts, emptyToughts });
  }
  static createTought(req, res) {
    res.render("toughts/create");
  }
  static createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };
    Tought.create(tought)
      .then(() => {
        req.flash("message", "Pensamento criado com sucesso!");
        req.session.save(() => {
          res.redirect("/toughts/dashboard");
        });
      })
      .catch((err) => console.log());
  }
  static async showToughts(req, res) {
    let search = "";
    if (req.query.search) {
      search = req.query.search;
    }
    let order = "DESC";
    if (req.query.order === "old") {
      order = "ASC";
    } else {
      order = "DESC";
    }
    const toughtsData = await Tought.findAll({
      include: User,
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      order: [["createdAt", order]],
    });
    const toughts = toughtsData.map((result) => result.get({ plain: true }));
    let toughtsQty = toughts.length;
    if (toughtsQty === 0) {
      toughtsQty = false;
    }
    res.render("toughts/home", { toughts, search, toughtsQty });
  }
  static removeTought(req, res) {
    const id = req.body.id;
    Tought.destroy({ where: { id: id } })
      .then(() => {
        req.flash("message", "Pensamento removido com sucesso!");
        req.session.save(() => {
          res.redirect("/toughts/dashboard");
        });
      })
      .catch((err) => console.log());
  }
  static async editTought(req, res) {
    const id = req.params.id;
    const tought = await Tought.findOne({ where: { id: id }, raw: true });
    res.render("toughts/edit", { tought });
  }
  static async editToughtSave(req, res) {
    const id = req.body.id;
    const tought = { title: req.body.title };
    await Tought.update(tought, { where: { id: id } });
    try {
      req.flash("message", "Pensamento atualizado com sucesso!");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log("Ocorreu o seguinte erro:" + error);
    }
  }
}
