import Product from "../models/Product.mjs";
export default class ProductsController {
  static async showProducts(req, res) {
    const products = await Product.getProducts();
    res.render("products/all", { products });
  }
  static async getProduct(req, res) {
    const id = req.params.id;
    const product = await Product.getProductById(id);
    res.render("products/product", { product });
  }
  static createProduct(req, res) {
    res.render("products/create");
  }
  static createProductPost(req, res) {
    const { name, image, price, description } = req.body;
    const product = new Product(name, image, price, description);
    product.save();
    res.redirect("/");
  }
  static async removeProduct(req, res) {
    const id = req.params.id;
    await Product.removeProductById(id);
    res.redirect("/");
  }
  static async editProductPage(req, res) {
    const id = req.params.id;
    const product = await Product.getProductById(id);
    res.render("products/edit", { product });
  }
  static async editProductPost(req, res) {
    const { id, name, image, price, description } = req.body;
    const product = new Product(name, image, price, description);
    await product.updateProduct(id);
    res.redirect("/");
  }
}
