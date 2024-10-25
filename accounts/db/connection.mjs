import { Sequelize } from "sequelize";
const sequelize = new Sequelize("accounts", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
try {
  sequelize.authenticate();
  console.log("Conexão com MYSQL executada.");
} catch (error) {
  console.log(error);
}
export default sequelize;
