//models
interface Product {
  id: number;
  title: string;
  category: string;
  situation: string;
  isSale: boolean;
  isHot: boolean;
  price: number;
  discount: number;
  image: string;
}

interface ApiResponse {
  product: Product[];
}

// shuffle prosesi
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
//CONTROLLERS
// butun hisselerin birge cagrilmasi
function fetchDataAndRender(): void {
  fetch("../../../public/json/db.json")
    .then((response) => response.json())
    .then((data: ApiResponse) => {
      renderHotItems(data.product);
      renderProductItems(data.product);
      renderBestSeller(data.product);
      renderNewsItems(data.product);
      updateCategoryButtonListeners(data.product);
      updateBestsellerCategoryButtonListeners(data.product);
      updateHotCategoryButtonListeners(data.product);
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
}
///VIEWS
//  Hot Div elements
function renderHotItems(products: Product[]): void {
  const hotDiv = document.querySelector<HTMLDivElement>(".hot_div");
  hotDiv?.classList.add("hot_div");
  const hotProducts = products.filter(
    (product) => product.situation === "popular"
  );
  const hotItemImg = document.createElement("img");
  hotItemImg.src = hotProducts[0].image;

  const hotItemDiv = document.createElement("div");
  hotItemDiv.classList.add("hot_div_div");
  hotProducts.slice(1, 5).forEach((product) => {
    const hotItem = document.createElement("img");
    hotItem.src = product.image;
    hotItem.alt = "hot";
    hotItemDiv?.appendChild(hotItem);
  });
  hotDiv?.appendChild(hotItemImg);
  hotDiv?.appendChild(hotItemDiv);
}
////////
function addToBasket(product: Product): void {
  basketItems.push(product);
  updateBasketUI();
}
let count = 0;
const countProduct = document.querySelector<HTMLDivElement>(".shopping_basket");
function updateProductImageListeners(products: Product[]): void {
  const productImages =
    document.querySelectorAll<HTMLImageElement>(".item_img");

  productImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      addToBasket(products[index]);
      count++;
      if (countProduct) {
        countProduct.textContent = count.toString();
        countProduct.style.display = "block";
      }
    });
  });
}

//////
// Product Div elements
function renderProductItems(products: Product[]): void {
  const productsDiv = document.querySelector<HTMLDivElement>(".products_div");
  const shuffledProducts = shuffle(products);
  shuffledProducts.slice(0, 8).forEach((product) => {
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
    itemImgDiv.innerHTML = `<img
    src=${product.image}
    alt="img"
    class="item_img"
  />
  <div class="newsletter_middle">
    <i
    class="fa-solid fa-bag-shopping fa-2xl"
      style="color: #ff6f61"
    ></i>`;

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
    itemPrice.textContent = product.price.toString();
    if (product.discount != 0) {
      itemPrice.textContent = (
        product.price -
        (product.price * product.discount) / 100
      ).toString();
    } else {
      itemDiscount.style.display = "none";
    }

    product.discount != 0
      ? (itemPrice.style.color = "red")
      : (itemPrice.style.color = "black");

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
  updateProductImageListeners(products);
}

//  Hot Div elements
function renderBestSeller(products: Product[]): void {
  const sellersDiv = document.querySelector<HTMLDivElement>(".seller_div");
  const shuffledProducts = shuffle(products);
  shuffledProducts.slice(0, 4).forEach((product) => {
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
    itemImgDiv.innerHTML = `<img
    src=${product.image}
    alt="img"
    class="item_img"
  />
  <div class="newsletter_middle">
    <i
    class="fa-solid fa-bag-shopping fa-2xl"
      style="color: #ff6f61"
    ></i>`;

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
    itemPrice.textContent = product.price.toString();
    if (product.discount != 0) {
      itemPrice.textContent = (
        product.price -
        (product.price * product.discount) / 100
      ).toString();
    } else {
      itemDiscount.style.display = "none";
    }

    product.discount != 0
      ? (itemPrice.style.color = "red")
      : (itemPrice.style.color = "black");

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

//  NewsLetter Div elements
function renderNewsItems(products: Product[]): void {
  const newsUl = document.querySelector<HTMLUListElement>(".newsletter_ul");
  newsUl?.classList.add("newsletter_ul");
  const newSletter = products.filter((product) => product.situation === "new");

  newSletter.slice(0, 6).forEach((product) => {
    const newItemLi = document.createElement("li");
    const newItemDiv = document.createElement("div");
    newItemDiv.classList.add("newsletter_container");
    newItemDiv.innerHTML = ` <img
    src=${product.image}
    alt="img"
    class="newsletter_image"
  />
  <div class="newsletter_middle">
    <i
      class="fa-brands fa-instagram fa-2xl"
      style="color: purple"
    ></i>`;
    newItemLi.append(newItemDiv);
    newsUl?.appendChild(newItemLi);
  });
}
//////
document.addEventListener("DOMContentLoaded", () => {
  fetchDataAndRender();
});

//buttons event

const accountBtn = document.querySelector<HTMLButtonElement>(".account_btn");
accountBtn?.addEventListener("click", () => {
  window.location.href = "index.html";
});
const basketItems: Product[] = [];
function updateBasketUI(): void {
  const basketUl = document.querySelector<HTMLUListElement>(".basket_ul");
  if (!basketUl) return;

  basketUl.innerHTML = "";

  basketItems.forEach((item) => {
    const basketLi = document.createElement("li");
    const basketDiv = document.createElement("div");
    basketDiv.classList.add("modal_header");
    const title = document.createElement("p");
    const category = document.createElement("p");
    const price = document.createElement("p");
    title.textContent = item.title;
    category.textContent = item.category;
    price.textContent = item.price.toString();
    basketDiv.appendChild(title);
    basketDiv.appendChild(category);
    basketDiv.appendChild(price);
    basketLi.append(basketDiv);
    basketUl.appendChild(basketLi);
  });
}
function calculateTotalPrice(): number {
  let totalPrice = 0;
  basketItems.forEach((item) => {
    totalPrice += item.price;
    if (item.discount > 0) {
      totalPrice -= (item.price * item.discount) / 100;
    }
  });
  return totalPrice;
}
function createModal(): void {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
  <div class="modal-content">
  <span class="close">&times;</span>

  <h2>Your Basket</h2>
  <div class="modal_header">
    <p class="modal_p">Title</p>
    <p class="modal_p">Category</p>
    <p class="modal_p">Price</p>
  </div>
  <ul class="basket_ul"></ul>
  <p class="modal_p">Total Price:${calculateTotalPrice()}</p>
  <input class="modal_input" type="text" value="card number..." />
  <button class="modal_submit">SUBMIT</button>
</div>
  `;

  document.body.appendChild(modal);

  const closeButton = modal.querySelector<HTMLButtonElement>(".close");

  closeButton?.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      document.body.removeChild(modal);
    }
  });
  updateBasketUI();
}

const shoppingBtn = document.querySelector<HTMLButtonElement>(".shoping_btn");
const shoppingNow = document.querySelector<HTMLButtonElement>("#shopping_now");

shoppingBtn?.addEventListener("click", () => {
  createModal();
});

shoppingNow?.addEventListener("click", () => {
  createModal();
});

const newsletterBtn =
  document.querySelector<HTMLButtonElement>(".newsletter_btn");
const newsletterInput =
  document.querySelector<HTMLInputElement>(".newsletter_input");
newsletterBtn?.addEventListener("click", () => {
  if (newsletterInput) newsletterInput.value = "Enter email address...";
});
//kateqoriye gore filtrleme
function renderFilteredProducts(category: string, products: Product[]): void {
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  const productsDiv = document.querySelector<HTMLDivElement>(".products_div");
  const hotsDiv = document.querySelector<HTMLDivElement>(".hot_div");
  const sellersDiv = document.querySelector<HTMLDivElement>(".seller_div");
  if (productsDiv && hotsDiv && sellersDiv) {
    productsDiv.innerHTML = "";
    hotsDiv.innerHTML = "";
    sellersDiv.innerHTML = "";
  }
  renderProductItems(filteredProducts);
  renderHotItems(filteredProducts);
  renderBestSeller(filteredProducts);
}

function updateCategoryButtonListeners(products: Product[]): void {
  const categoryButtons =
    document.querySelectorAll<HTMLButtonElement>(".li_btn");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.textContent || "";
      renderFilteredProducts(category, products);
    });
  });
}

function renderFilteredBestsellers(
  category: string,
  products: Product[]
): void {
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  const sellersDiv = document.querySelector<HTMLDivElement>(".seller_div");
  if (sellersDiv) sellersDiv.innerHTML = "";
  renderBestSeller(filteredProducts);
}

function updateBestsellerCategoryButtonListeners(products: Product[]): void {
  const categoryButtons =
    document.querySelectorAll<HTMLButtonElement>(".seller_ul button");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.textContent || "";
      if (category === "All Products") {
        renderBestSeller(products);
      } else {
        renderFilteredBestsellers(category, products);
      }
    });
  });
}

function renderFilteredHot(category: string, products: Product[]): void {
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  const hotDiv = document.querySelector<HTMLDivElement>(".products_div");
  if (hotDiv) hotDiv.innerHTML = "";
  renderProductItems(filteredProducts);
}

function updateHotCategoryButtonListeners(products: Product[]): void {
  const categoryButtons = document.querySelectorAll<HTMLButtonElement>(
    ".products_ul button"
  );
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.textContent || "";
      if (category === "All Products") {
        renderProductItems(products);
      } else {
        renderFilteredHot(category, products);
      }
    });
  });
}
