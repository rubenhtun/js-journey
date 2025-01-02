// sample products lists on sales
const products = [
  { id: 1, name: "Product A", price: 10, image: "assets/images/product-a.jpg" },
  { id: 2, name: "Product B", price: 15, image: "assets/images/product-b.jpg" },
  { id: 3, name: "Product C", price: 20, image: "assets/images/product-c.jpg" },
  { id: 4, name: "Product D", price: 25, image: "assets/images/product-d.jpg" },
];

// ဝယ်ယူမည့် ဈေးခြင်းထဲထည့်ဖို့ရန် empty array
let cart = [];

const productsContainer = document.querySelector("#products .grid");

// loop ပတ်မည်။
products.forEach((product) => {
  const productCard = document.createElement("div"); // html element တစ်ခုတည်ဆောက်မည်။
  productCard.classList.add("border", "p-4", "rounded", "bg-white", "shadow");
  productCard.innerHTML = `
      <img src="${product.image}" alt="${
    product.name
  }" class="w-full h-32 object-cover rounded mb-2">
      <h3 class="text-lg font-bold">${product.name}</h3>
      <p class="text-sm text-gray-600">$${product.price.toFixed(2)}</p>
      <button class="mt-2 w-full bg-blue-500 text-white py-1 rounded" onclick="addToCart(${
        // addToCart() ခေါ်ရမည်။
        product.id
      })">
        Add to Cart
      </button>
    `;
  productsContainer.appendChild(productCard);
});

const addToCart = (productId) => {
  // products array ထဲမှ prodcutId နှင့်တူညီသော product ကို ရှာ။
  const addedProduct = products.find((product) => product.id === productId);
  // product တစ်ခု ကို တစ်ကြိမ်သာလျှင် cart အတွင်းထည့်နိုင်ရန် // လက်ရှိပြန်ထည့်မယ့် product ဟာ cart ရှိ/မရှိ စစ်ဆေးခြင်း
  const isInCart = cart.some((item) => item.id === productId);
  // မရှိဘူး သေချာပြီဆိုမှသာ အောက်က codes တွေကို run ပါမည်။
  if (addedProduct && !isInCart) {
    cart.push(addedProduct);
    updateCart();
  }
};

let totalCost;

function updateCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  totalCost = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.classList.add("flex", "justify-between", "items-center");
    cartItem.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
        <button class="text-red-500" onclick="removeFromCart(${
          item.id
        })">Remove</button>
      `;
    totalCost += item.price;
    cartContainer.appendChild(cartItem);
  });

  document.getElementById("total-price").textContent = totalCost.toFixed(2);
}

const removeFromCart = (productId) => {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
};

const checkout = () => {
  if (totalCost) {
    alert("Your purchase is successful!");
  }
  refreshPage();
};

const refreshPage = () => {
  window.location.reload();
};
