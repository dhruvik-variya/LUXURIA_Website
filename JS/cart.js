import footer from "../Component/footer.js";
import createTag from "../Component/helper.js";
import Navbar from "../Component/navbar.js";

document.getElementById("navbar").innerHTML = Navbar();

document.getElementById("Footer").innerHTML = footer();



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
  document.getElementById("totalbox").innerHTML = "";  

  // empty div blank
  document.getElementById("empty").innerHTML = "";
  if(cart.length == 0){
     empty.innerHTML = `
     
     <img src="../img/empty-cart-removebg-preview.png" alt="" class="empty-img">
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

  let labelproduct = createTag("h4", "product");
  
  let labeltitle = createTag("h4", "title");
  let labelprice = createTag("h4", "price");
  let labelqty = createTag("h4", "qty");
  let labelcategory = createTag("h4", "category");
  let labeltotal = createTag("h4", "total");
  let labelremove = createTag("h4", "remove");
  label.append(labelproduct,labeltitle,labelprice,labelqty,labelcategory,labeltotal,labelremove);

  document.getElementById("cartlist").append(label);


  // summry variables
  let totalqty = 0;
  let subTotal = 0;
  const gstRate = 0.18;

  cart.map((ele, index) => {
    let div = createTag("div", "");
    div.className = "mainCart";    

    let img = createTag("img", ele.img);
    let title = createTag("h3", ele.title);

    let div1 = createTag("div", "");
    div1.className = "QTYbtn"; 

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
    remove.className = "remove"; 
    remove.addEventListener("click", () => handleremove(index));

    div.append(img, title, price, div1, category, total, remove);
    document.getElementById("cartlist").append(div);

    subTotal += ele.qty * ele.price;
    totalqty += ele.qty;
  });
 

   
  let totalGst = gstRate * subTotal;
  let totalAmount = subTotal + totalGst;

  //     subtotal  GST      
  let summaryDiv = createTag("div", "");
  summaryDiv.className = "summary";

  let summary = createTag("h3", "Summary");
  summary.className = "order-summary"; 

  let summaryqty = createTag("p", `totalqty: <span class="sub-span">${totalqty}</span>`);

  let subtotal = createTag("p", `Subtotal: <span class="sub-span">$${subTotal.toFixed(2)}</span>`);

  let gst = createTag("p", `GST: <span class="sub-span">$${totalGst.toFixed(2)}</span>`);

  let totalamount = createTag("p", `totalamount:<span class="sub-span">$${totalAmount.toFixed(2)}</span>`);

  // promo code
  let promoCodeLabel = createTag("label", "Promo Code :");
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
  checkoutbtn.className = "checkout-btn"; 
  checkoutbtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    window.location.href = "/index.html";
  });

  summaryDiv.append(summary,summaryqty,subtotal,gst,totalamount,promoCodeLabel,promoCodeInput,promoSubmitBtn,checkoutbtn);
  document.getElementById("totalbox").append(summaryDiv);

}
};



mapper(cart);
