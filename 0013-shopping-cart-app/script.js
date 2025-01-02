// ဝယ်ယူမည့် products များကို sample array object တစ်ခုအတွင်း assign လုပ်ပါသည်။
const products = [
  { id: 1, name: "product1", price: 10.99 },
  { id: 2, name: "product2", price: 9.99 },
  { id: 3, name: "product3", price: 12.99 },
  { id: 4, name: "product4", price: 8.99 },
  { id: 5, name: "product5", price: 11.99 },
  { id: 6, name: "product6", price: 21.99 },
];

// object တစ်ခုချင်းစီကို forEach နှင့် loop ပတ်ပါသည်။
products.forEach((product) => {
  const productCard = document.createElement("div");
  productCard.classList.add("bg-white", "p-4", "rounded-lg", "shadow-md");

  // object property values တွေကို html elements တွေအတွင်း ဖော်ပြပါမည်။
  productCard.innerHTML = `
      <h3 class="text-xl font-semibold">${product.name}</h3>
      <p class="text-gray-700">$${product.price.toFixed(2)}</p>
      <button class="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    `;
  document.getElementById("product-list").appendChild(productCard);
});

// cart အတွင်း ထည့်လိုသော products များကို cart[] ၌ push လုပ်ပါမည်။
let cart = [];

const addToCart = (productId) => {
  // Add to Cart button ကို နှိပ်သောအခါ products array ထဲမှ parameter productId နှင့်ညီသော product ကိုသာ ရယူပါမည်။
  const product = products.find((item) => item.id === productId);
  if (product) {
    cart.push(product); // ဝယ်ယူလိုသည့်အခါ
    productsInCart();
  }
};

// cart အတွင်း ထည့်လိုက်သော products များကို ပြန်လည်စာရင်း"lists"အားဖြင့် ဖော်ပြပါမည်။
const productsInCart = () => {
  const cartItems = document.getElementById("cart-items");
  // product တစ်ခု ထည့်လိုက်သည်ဖြစ်စေ, ပြန်ဖယ်ထားလိုက်သည်ဖြစ်စေ cart-items များကို ပြန်လည် render လုပ်ပါမည်။
  cartItems.innerHTML = ""; // *important code line*
  // loop for cart[]
  cart.forEach((item, i) => {
    const cartItem = document.createElement("li");
    cartItem.className = "flex justify-between items-center py-2";
    cartItem.innerHTML = `
          <span>${item.name}</span>
          <span>$${item.price.toFixed(2)}</span>
          <button onclick="removeFromCart(${i})" class="text-red-500 hover:text-red-700">
            Remove
          </button>
        `;
    cartItems.appendChild(cartItem);
  });

  // to calculate total price of products
  sumOfPrice();
};

// စုစုပေါင်းကုန်ကျစရိတ်ကို တွက်ယူနိုင်ဖို့ရန်
const sumOfPrice = () => {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById(
    "total-price"
  ).innerText = `Total: $${totalPrice.toFixed(2)}`;
};

// to remove item from cart || product တစ်ခုကို ပြန်လည်ဖယ်ရှားလိုသောအခါ
const removeFromCart = (i) => {
  cart.splice(i, 1);
  productsInCart();
};

// To confirm buying all product lists || နောက်ဆုံး၌ ဝယ်ယူခြင်းကို အတည်ပြုပါမည်။
document.getElementById("checkout-btn").addEventListener("click", () => {
  alert(
    `Thank you for your purchase! Total: $${cart
      .reduce((sum, item) => sum + item.price, 0)
      .toFixed(2)}`
  );
  cart.length = 0; // Clear the cart to start again
  productsInCart();
});
