import createTag from "../Component/helper.js";
import Navbar from "../Component/navbar.js";

document.getElementById("navbar").innerHTML = Navbar();



// display

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const mapper = (cart) => {
  document.getElementById("cartlist").innerHTML = "";

  cart.map((ele, index) => {
    let div = createTag("div", "");

    let img = createTag("img", ele.img);
    let title = createTag("h3", ele.title);
    let div1 = createTag("div","")
   let qty = createTag("h3", ele.qty);
    let minus = createTag("button", "-");
    let plus = createTag("button", "+");
    div1.append(minus,qty,plus);
    let category = createTag("h3", ele.category);
    let price = createTag("p", `$${ele.price}`);
    let total = createTag("p", `$${ele.qty * ele.price}`);

    const remove = document.createElement("button");
    remove.textContent = "remove";
    remove.addEventListener("click", () => handleDelete(index));



    div.append(img, title, price, div1, category, total,remove);
    document.getElementById("cartlist").append(div);


  });
};

mapper(cart);
