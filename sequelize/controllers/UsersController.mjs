import User from "../models/User.mjs";
import Address from "../models/Adress.mjs";
export default class UsersControllers {
  static async showUsers(req, res) {
    const users = await User.findAll({ raw: true });
    console.log(users);
    res.render("home", { users });
  }
  static async showUser(req, res) {
    const id = req.params.id;
    const user = await User.findOne({
      raw: true,
      where: {
        id: id,
      },
    });
    res.render("userview", { user });
  }
  static createUserPage(req, res) {
    res.render("adduser");
  }
  static async createUser(req, res) {
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;
    if (newsletter === "on") {
      newsletter = true;
    } else {
      newsletter = false;
    }
    console.log(req.body);
    await User.create({
      name,
      occupation,
      newsletter,
    });
    res.redirect("/users");
  }
  static async deleteUser(req, res) {
    const id = req.params.id;
    await User.destroy({ where: { id: id } });
    res.redirect("/users");
  }
  static async editUserPage(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findOne({
        include: Address,
        where: { id: id },
      });
      res.render("useredit", { user: user.get({ plain: true }) });
    } catch (error) {
      console.log(error);
    }
  }
  static async updateUser(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    const newsletter = req.body.newsletter;
    if (newsletter == "on") {
      newsletter = true;
    } else {
      newsletter == false;
    }
    const userData = {
      id,
      name,
      occupation,
      newsletter,
    };
    await User.update(userData, { where: { id: id } });
    res.redirect("/users");
  }
  static async createAdress(req, res) {
    const UserId = req.body.UserId;
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;
    const address = {
      UserId,
      street,
      number,
      city,
    };
    await Address.create(address);
    res.redirect(`/users/${UserId}`);
  }
  static async deleteAdress(req, res) {
    const UserId = req.body.UserId;
    const id = req.body.id;
    await Address.destroy({
      where: { id: id },
    });
    res.redirect(`/users/${UserId}`);
  }
}
