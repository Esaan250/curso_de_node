import { Sequelize } from "sequelize";
const sequelize = new Sequelize("nodemvc", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
try {
  sequelize.authenticate();
  console.log("Conexão com MySQL concluída.");
} catch (error) {
  console.log(`Não foi possível conectar! Erro: ${error}`);
}
export default sequelize;
