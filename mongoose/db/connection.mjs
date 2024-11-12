import mongoose from "mongoose";
const main = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/skytown", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB + Mongoose conectados.");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
};
main();
export default main;
