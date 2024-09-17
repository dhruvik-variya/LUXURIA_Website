import createTag from "../Component/helper.js";
import Navbar from "../Component/navbar.js";

document.getElementById("navbar").innerHTML = Navbar();





// remove item from cart
const handleremove = (index) => {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  mapper(cart);
};

// qty handle
const handleQty = (option, index) => {
  if (option == "+") {
    cart[index].qty += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    if (cart[index].qty > 1) {
      cart[index].qty -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      handleremove(index);
    }
  }
  mapper(cart);
};

// display cart items
let cart = JSON.parse(localStorage.getItem("cart")) || []; 



const mapper = (cart) => {
  document.getElementById("cartlist").innerHTML = "";
  document.getElementById("totalbox").innerHTML = ""; // Clear the totalbox before appending new content

  // empty div blank
  document.getElementById("empty").innerHTML = "";
  if(cart.length == 0){
     empty.innerHTML = `
     <div class="msg">
     <p class="product-para">Cart is empty. Add some products to checkout!</p>
     <a class="Btnn" href="../Pages/product.html"><button>SHOP NOW!</button></a>
     </div>
     `
  }

  

  

 else{

  // cart box lable

  let label = createTag("label", "");
  label.className = "label-list";

  let labelproduct = createTag("h3", "product");
  let labeltitle = createTag("h3", "title");
  let labelprice = createTag("h3", "price");
  let labelqty = createTag("h3", "qty");
  let labelcategory = createTag("h3", "category");
  let labeltotal = createTag("h3", "total");
  let labelremove = createTag("h3", "remove");
  label.append(labelproduct,labeltitle,labelprice,labelqty,labelcategory,labeltotal,labelremove);

  document.getElementById("cartlist").append(label);


  // summry variables
  let totalqty = 0;
  let subTotal = 0;
  const gstRate = 0.18;

  cart.map((ele, index) => {
    let div = createTag("div", "");
    div.className = "mainCart"; // Fixed class name

    let img = createTag("img", ele.img);
    let title = createTag("h3", ele.title);

    let div1 = createTag("div", "");
    div1.className = "QTYbtn"; // Fixed class name

    let minus = createTag("button", "-");
    minus.addEventListener("click", () => handleQty("-", index));

    let qty = createTag("h3", ele.qty);

    let plus = createTag("button", "+");
    plus.addEventListener("click", () => handleQty("+", index));

    div1.append(minus, qty, plus);

    let category = createTag("h3", ele.category);
    let price = createTag("p", `$${ele.price}`);
    let total = createTag("p", `$${ele.qty * ele.price}`);

    let remove = document.createElement("button");
    remove.textContent = "remove";
    remove.className = "remove"; // Assign the remove button class for proper styling
    remove.addEventListener("click", () => handleremove(index));

    div.append(img, title, price, div1, category, total, remove);
    document.getElementById("cartlist").append(div);

    subTotal += ele.qty * ele.price;
    totalqty += ele.qty;
  });
 

  // Calculate GST once after looping through the cart
  let totalGst = gstRate * subTotal;
  let totalAmount = subTotal + totalGst;

  // Display the subtotal and GST after mapping all cart items
  let summaryDiv = createTag("div", "");
  summaryDiv.className = "summary";

  let summary = createTag("h3", "Summary");
  summary.className = "order-summary"; 

  let summaryqty = createTag("p", `totalqty:${totalqty}`);

  let subtotal = createTag("p", `Subtotal: $${subTotal.toFixed(2)}`);

  let gst = createTag("p", `GST: $${totalGst.toFixed(2)}`);

  let totalamount = createTag("p", `totalamount:$${totalAmount.toFixed(2)}`);

  // promo code
  let promoCodeLabel = createTag("label", "Promo Code");
  promoCodeLabel.setAttribute("for", "promoCodeInput");
  promoCodeLabel.className = "promo-code-label";

  let promoCodeInput = createTag("input", "");
  promoCodeInput.type = "text";
  promoCodeInput.className = "promo-code-input";
  promoCodeInput.id = "promoCodeInput";
  promoCodeInput.placeholder = "Enter Promo Code";

  // Create a submit button for the promo code
  let promoSubmitBtn = createTag("button", "Apply");
  promoSubmitBtn.className = "promo-submit-btn";

  let checkoutbtn = createTag("button", "Checkout");
  checkoutbtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    window.location.href = "/index.html";
  });

  summaryDiv.append(summary,summaryqty,subtotal,gst,totalamount,promoCodeLabel,promoCodeInput,promoSubmitBtn,checkoutbtn);
  document.getElementById("totalbox").append(summaryDiv);

}
};



mapper(cart);
