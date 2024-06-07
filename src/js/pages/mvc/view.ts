import { Product } from "./model";

export class View {
  constructor(private handleAddToCart: (product: Product) => void) {}

  renderHotItems(products: Product[]): void {
    const hotDiv = document.querySelector<HTMLDivElement>(".hot_div");
    hotDiv?.classList.add("hot_div");
    const hotProducts = products.filter(
      (product) => product.situation === "popular"
    );
    const hotItemImg = document.createElement("img");
    hotItemImg.src = hotProducts[0].image;

    const hotItemDiv = document.createElement("div");
    hotItemDiv.classList.add("hot_div_div");
    hotProducts.slice(1, 4).forEach((product) => {
      const hotItem = document.createElement("img");
      hotItem.src = product.image;
      hotItem.alt = "hot";
      hotItemDiv?.appendChild(hotItem);
    });
    hotDiv?.appendChild(hotItemImg);
    hotDiv?.appendChild(hotItemDiv);
  }

  renderProductItems(products: Product[]): void {
    const productsDiv = document.querySelector<HTMLDivElement>(".products_div");
    if (productsDiv) productsDiv.innerHTML = "";
    products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("products_item");

      const itemDescription = document.createElement("div");
      itemDescription.classList.add("item_description");
      if (product.isSale) {
        itemDescription.textContent = "SALE";
        itemDescription.style.backgroundColor = "black";
      } else if (product.isHot) {
        itemDescription.textContent = "HOT";
        itemDescription.style.backgroundColor = "#ff6f61";
      } else {
        itemDescription.style.display = "none";
      }

      const itemImgDiv = document.createElement("div");
      itemImgDiv.classList.add("bestseller_container");
      itemImgDiv.innerHTML = `
                <img src=${product.image} alt="img" class="item_img" />
                <div class="overlay">
                    <span class="basket-icon">&#128722;</span>
                </div>
            `;
      itemImgDiv
        .querySelector(".basket-icon")
        ?.addEventListener("click", () => {
          this.handleAddToCart(product);
        });

      const itemParagraph = document.createElement("div");
      itemParagraph.classList.add("item_paragraph");

      const itemName = document.createElement("p");
      itemName.classList.add("item", "name");
      itemName.textContent = product.title;

      const itemCategory = document.createElement("p");
      itemCategory.classList.add("item", "category");
      itemCategory.textContent = product.category;

      const itemDetails = document.createElement("div");

      const itemDiscount = document.createElement("p");
      itemDiscount.classList.add("item", "discount");
      itemDiscount.textContent = product.price.toString();

      const itemPrice = document.createElement("p");
      itemPrice.classList.add("item", "price");
      itemPrice.textContent =
        product.discount !== 0
          ? (
              product.price -
              (product.price * product.discount) / 100
            ).toString()
          : product.price.toString();

      itemDiscount.style.display = product.discount !== 0 ? "block" : "none";
      itemPrice.style.color = product.discount !== 0 ? "red" : "black";

      itemDetails.appendChild(itemDiscount);
      itemDetails.appendChild(itemPrice);

      itemParagraph.appendChild(itemName);
      itemParagraph.appendChild(itemCategory);
      itemParagraph.appendChild(itemDetails);

      productItem.appendChild(itemDescription);
      productItem.appendChild(itemImgDiv);
      productItem.appendChild(itemParagraph);

      productsDiv?.appendChild(productItem);
    });
  }

  renderBestSeller(products: Product[]): void {
    const sellersDiv = document.querySelector<HTMLDivElement>(".seller_div");
    if (sellersDiv) sellersDiv.innerHTML = "";
    products.forEach((product) => {
      const sellerItem = document.createElement("div");
      sellerItem.classList.add("seller_item");

      const itemDescription = document.createElement("div");
      itemDescription.classList.add("item_description");
      if (product.isSale) {
        itemDescription.textContent = "SALE";
        itemDescription.style.backgroundColor = "black";
      } else if (product.isHot) {
        itemDescription.textContent = "HOT";
        itemDescription.style.backgroundColor = "#ff6f61";
      } else {
        itemDescription.style.display = "none";
      }

      const itemImgDiv = document.createElement("div");
      itemImgDiv.classList.add("bestseller_container");
      itemImgDiv.innerHTML = `
                <img src=${product.image} alt="img" class="item_img" />
                <div class="overlay">
                    <span class="basket-icon">&#128722;</span>
                </div>
            `;
      itemImgDiv
        .querySelector(".basket-icon")
        ?.addEventListener("click", () => {
          this.handleAddToCart(product);
        });

      const itemParagraph = document.createElement("div");
      itemParagraph.classList.add("item_paragraph");

      const itemName = document.createElement("p");
      itemName.classList.add("item", "name");
      itemName.textContent = product.title;

      const itemCategory = document.createElement("p");
      itemCategory.classList.add("item", "category");
      itemCategory.textContent = product.category;

      const itemDetails = document.createElement("div");

      const itemDiscount = document.createElement("p");
      itemDiscount.classList.add("item", "discount");
      itemDiscount.textContent = product.price.toString();

      const itemPrice = document.createElement("p");
      itemPrice.classList.add("item", "price");
      itemPrice.textContent =
        product.discount !== 0
          ? (
              product.price -
              (product.price * product.discount) / 100
            ).toString()
          : product.price.toString();

      itemDiscount.style.display = product.discount !== 0 ? "block" : "none";
      itemPrice.style.color = product.discount !== 0 ? "red" : "black";

      itemDetails.appendChild(itemDiscount);
      itemDetails.appendChild(itemPrice);

      itemParagraph.appendChild(itemName);
      itemParagraph.appendChild(itemCategory);
      itemParagraph.appendChild(itemDetails);

      sellerItem.appendChild(itemDescription);
      sellerItem.appendChild(itemImgDiv);
      sellerItem.appendChild(itemParagraph);

      sellersDiv?.appendChild(sellerItem);
    });
  }

  renderNewsItems(products: Product[]): void {
    const newsUl = document.querySelector<HTMLUListElement>(".newsletter_ul");
    if (newsUl) newsUl.innerHTML = "";
    const newSletter = products.filter(
      (product) => product.situation === "new"
    );

    newSletter.slice(0, 6).forEach((product) => {
      const newItemLi = document.createElement("li");
      const newItemContainer = document.createElement("div");
      newItemContainer.classList.add("newsletter_container");
      newItemContainer.innerHTML = `
                <img src=${product.image} alt="img" class="item_img" />
                <div class="overlay">
                    <span class="basket-icon">&#128722;</span>
                </div>
            `;
      newItemContainer
        .querySelector(".basket-icon")
        ?.addEventListener("click", () => {
          this.handleAddToCart(product);
        });

      const itemParagraph = document.createElement("div");
      itemParagraph.classList.add("item_paragraph");

      const itemName = document.createElement("p");
      itemName.classList.add("item", "name");
      itemName.textContent = product.title;

      const itemCategory = document.createElement("p");
      itemCategory.classList.add("item", "category");
      itemCategory.textContent = product.category;

      const itemDetails = document.createElement("div");

      const itemDiscount = document.createElement("p");
      itemDiscount.classList.add("item", "discount");
      itemDiscount.textContent = product.price.toString();

      const itemPrice = document.createElement("p");
      itemPrice.classList.add("item", "price");
      itemPrice.textContent =
        product.discount !== 0
          ? (
              product.price -
              (product.price * product.discount) / 100
            ).toString()
          : product.price.toString();

      itemDiscount.style.display = product.discount !== 0 ? "block" : "none";
      itemPrice.style.color = product.discount !== 0 ? "red" : "black";

      itemDetails.appendChild(itemDiscount);
      itemDetails.appendChild(itemPrice);

      itemParagraph.appendChild(itemName);
      itemParagraph.appendChild(itemCategory);
      itemParagraph.appendChild(itemDetails);

      newItemContainer.appendChild(itemParagraph);
      newItemLi.appendChild(newItemContainer);
      newsUl?.appendChild(newItemLi);
    });
  }
}
