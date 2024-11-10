import connection from "../db/connection.mjs";
import { ObjectId } from "mongodb";
class Product {
  constructor(name, image, price, description) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }
  save() {
    const product = connection.db().collection("products").insertOne({
      name: this.name,
      price: this.price,
      image: this.image,
      description: this.description,
    });
    return product;
  }
  static getProducts() {
    const products = connection.db().collection("products").find().toArray();
    return products;
  }
  static async getProductById(id) {
    const product = await connection
      .db()
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    return product;
  }
  static async removeProductById(id) {
    await connection
      .db()
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });
    return;
  }
  updateProduct(id) {
    connection
      .db()
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: this });
    return;
  }
}
export default Product;
