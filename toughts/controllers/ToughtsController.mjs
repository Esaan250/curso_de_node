import Tought from "../models/Tought.mjs";
import User from "../models/User.mjs";
export default class ToughtsControllers {
  static async showToughts(req, res) {
    res.render("toughts/home");
  }
}
