import Product from "../models/Product.mjs";
export default class ProductsController {
  static async showProducts(req, res) {
    const products = await Product.find().lean();
    res.render("products/all", { products });
  }
  static async getProduct(req, res) {
    const id = req.params.id;
    const product = await Product.findById(id).lean();
    res.render("products/product", { product });
  }
  static createProduct(req, res) {
    res.render("products/create");
  }
  static async createProductPost(req, res) {
    try {
      const { name, image, price, description } = req.body;
      const product = new Product({ name, image, price, description });

      // Salva o produto no banco
      await product.save();

      // Redireciona para a página inicial ou onde você desejar
      res.redirect("/");
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
      // Caso haja erro, você pode redirecionar para uma página de erro ou exibir uma mensagem
      res.status(500).send("Erro ao salvar o produto.");
    }
  }
  static async removeProduct(req, res) {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    res.redirect("/");
  }
  static async editProductPage(req, res) {
    const id = req.params.id;
    const product = await Product.findById(id).lean();
    res.render("products/edit", { product });
  }
  static async editProductPost(req, res) {
    const { id, name, image, price, description } = req.body;
    const product = { name, image, price, description };
    await Product.updateOne({ _id: id }, product);
    res.redirect("/");
  }
}
