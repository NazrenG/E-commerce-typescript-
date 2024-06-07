import productData from "../public/json/db.json";

interface Product {
  id: number;
  title: string;
  category: string;
  situation: string;
  isSale: boolean;
  isHot: boolean;
  discount: number;
  image: string;
}

interface ApiResponse {
  product: Product[];
}

const json: ApiResponse = productData;

function shuffle(array: Product[]): Product[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledProducts = shuffle(json.product);

const productsDiv = document.querySelector<HTMLDivElement>(".products_div");

shuffledProducts.slice(0, 4).forEach((product) => {
  const productItem = document.createElement("div");
  productItem.classList.add("products_item");
  productItem.innerHTML = `
    <div class="item_description">${product.isHot ? "HOT" : ""}</div>
    <img src="${product.image}" alt="${product.title}" class="item_img" />
    <div class="item_paragraph">
      <p class="item name">${product.title}</p>
      <p class="item category">${product.category}</p>
      <div>
        <p class="item discount">${product.discount}% off</p>
        <p class="item price">${
          product.isSale ? "On Sale" : "Regular Price"
        }</p>
      </div>
    </div>
  `;
  productsDiv?.appendChild(productItem);
});
// import productData from "../../../public/json/db.json";

// interface Product {
//   id: number;
//   title: string;
//   category: string;
//   situation: string;
//   isSale: boolean;
//   isHot: boolean;
//   discount: number;
//   image: string;
// }

// interface ApiResponse {
//   product: Product[];
// }

// const json: ApiResponse = productData;

// const accountBtn = document.querySelector<HTMLButtonElement>(".account_btn");
// const shoppingBtn = document.querySelector<HTMLButtonElement>(".shoping_btn");
// const shoppingNow = document.querySelector<HTMLButtonElement>("#shopping_now");

// // Function to shuffle the array using the Fisher-Yates algorithm
// function shuffle(array: Product[]): Product[] {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// const shuffledProducts = shuffle(json.product);

// // Select the products_div element
// const productsDiv = document.querySelector<HTMLDivElement>(".products_div");
// productsDiv?.classList.add("products_div");
// // Append only the first 4 shuffled products to the productsDiv
// shuffledProducts.slice(0, 4).forEach((product) => {
//   const productItem = document.createElement("div");
//   productItem.innerHTML = `
//     <div class="item_description">${product.isHot ? "HOT" : ""}</div>
//     <img src="${product.image}" alt="${product.title}" class="item_img" />
//     <div class="item_paragraph">
//       <p class="item name">${product.title}</p>
//       <p class="item category">${product.category}</p>
//       <div>
//         <p class="item discount">${product.discount}% off</p>
//         <p class="item price">${
//           product.isSale ? "On Sale" : "Regular Price"
//         }</p>
//       </div>
//     </div>
//   `;
//   productsDiv?.appendChild(productItem);
// });

// // Add event listener for account button
// accountBtn?.addEventListener("click", () => {
//   window.location.href = "index.html";
// });

// // Function to create a modal
// function createModal() {
//   console.log("isleyir");
//   const modal = document.createElement("div");
//   modal.classList.add("modal");
//   modal.innerHTML = `
//     <div class="modal-content">
//       <span class="close">&times;</span>
//       <h2>Modal Title</h2>
//       <p>This is a simple modal example.</p>
//     </div>
//   `;

//   document.body.appendChild(modal);

//   const closeButton = modal.querySelector<HTMLButtonElement>(".close");

//   closeButton?.addEventListener("click", () => {
//     document.body.removeChild(modal);
//   });

//   window.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       document.body.removeChild(modal);
//     }
//   });
// }

// // Add event listeners for shopping buttons
// shoppingBtn?.addEventListener("click", () => {
//   createModal();
// });
// shoppingNow?.addEventListener("click", () => {
//   createModal();
// });
