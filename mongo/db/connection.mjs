import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017/skytown";
const client = new MongoClient(uri);
const run = async () => {
  try {
    await client.connect();
    console.log("Conectando ao MongoDB...");
  } catch (error) {
    console.log(error);
  }
};
run();
export default client;
