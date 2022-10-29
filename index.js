//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//open cart
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
})

//close cart
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
})

//working cart
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//function

function ready() {
    //removing items 
    let removeCartBtn = document.getElementsByClassName("cart-remove");

    for (let index = 0; index < removeCartBtn.length; index++) {
        const button = removeCartBtn[index];
        button.addEventListener("click", removeCartItem)
    }

    //quantity changes
    let quantityInputs = document.getElementsByClassName("cart-quantity");

    for (let index = 0; index < quantityInputs.length; index++) {
        let input = quantityInputs[index];
        input.addEventListener("change", quantityChanged);
    }

    //add to cart
    let addCart = document.getElementsByClassName("add-cart");
    for (let index = 0; index < addCart.length; index++) {
        let button = addCart[index];
        button.addEventListener("click", addCartClicked)
    }

    //buy btn 
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyBtnClicked);
}

//buy button
function buyBtnClicked(params) {
    alert("Your order is placed");
    let cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}

function removeCartItem(e) {
    let buttonClicked = e.target
    buttonClicked.parentElement.remove();
    updateTotal();
}

//add to cart 
function addCartClicked(params) {
    let button = params.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

    for (let index = 0; index < cartItemsNames.length; index++) {
        if (cartItemsNames[index].innerText == title) {
            alert("You have already added this item")
            return;
        }
    }


    let cartBoxContent =
        `
<img src="${productImg}" alt="product img" class="cart-img">

<div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>

<i class="fa-solid fa-trash cart-remove" id="trash-icon"></i>
`
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

//quantity changes
function quantityChanged(params) {
    let input = params.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal()
}
//update total

function updateTotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;

    for (let index = 0; index < cartBoxes.length; index++) {
        let cartBox = cartBoxes[index];
        let priceElem = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElem = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElem.innerText.replace("$", ""));
        let quantity = quantityElem.value;
        total = total + (price * quantity);
    }
    //if price has some cents 
    total = Math.round(total * 100) / 100

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}