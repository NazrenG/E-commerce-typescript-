import { Product } from "./model";
import { View } from "./view";

export class ViewModel {
  private products: Product[] = [];
  private cart: Product[] = [];
  private view: View;

  constructor() {
    this.view = new View(this.handleAddToCart.bind(this));
    this.fetchDataAndRender();
  }

  fetchDataAndRender(): void {
    fetch("../../../public/json/db.json")
      .then((response) => response.json())
      .then((data: { product: Product[] }) => {
        this.products = data.product;
        this.renderAll();
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  }

  renderAll(): void {
    this.view.renderHotItems(this.products);
    this.view.renderProductItems(this.products);
    this.view.renderBestSeller(
      this.products.filter((product) => product.situation === "bestseller")
    );
    this.view.renderNewsItems(this.products);
  }

  handleAddToCart(product: Product): void {
    this.cart.push(product);
    console.log("Product added to cart:", product);
    alert("Product added to cart: " + product.title);
  }

  getCartItems(): Product[] {
    return this.cart;
  }

  getTotalPrice(): number {
    return this.cart.reduce(
      (total, product) =>
        total + product.price - (product.price * product.discount) / 100,
      0
    );
  }
}
