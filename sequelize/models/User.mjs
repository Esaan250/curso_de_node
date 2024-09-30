import { DataTypes } from "sequelize";
import connection from "../db/connection.mjs";
const User = connection.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING,
    required: true,
  },
  newsLetter: {
    type: DataTypes.BOOLEAN,
  },
});
export default User;
