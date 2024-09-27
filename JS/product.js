import Navbar from "../Component/navbar.js";
import createTag from "../Component/helper.js";
import footer from "../Component/footer.js";


document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("Footer").innerHTML = footer();


let products = JSON.parse(localStorage.getItem("products")) || [];
console.log(products);

const mapper = (data) => {
  document.getElementById("productlist").innerHTML = "";

  if (data.length === 0) {
    document.getElementById("product").innerHTML = "";
    products.innerHTML = `
        <div class="msg">
            <img src="../img/product-is-empty-removebg-preview.png" alt="img" class="empty-img">

        <p class="product-para">No products available at the moment. Please check back later!</p>
        <p>Please first Add Some Product first.</p>
        <a class="Btnn" href="../Pages/addproduct.html"><button>ADD PRODUCT FIRST!</button></a>
        </div>
        `;
  }

  data.map((ele) => {
    let title = createTag("h3", ele.title);

    let price = createTag("p", `$${ele.price}`);
    let img = createTag("img", ele.img);
    let category = createTag("p", ele.category);
    let groupBtn = document.createElement("div");
    groupBtn.className = "group-Btn";
    let Buybtn = document.createElement("button");
    Buybtn.innerText = "BUY";
    Buybtn.classList.add("buy-btn");
    Buybtn.addEventListener("click", () =>
      alert(`You have selected to buy ${ele.title} for ${ele.price}.`)
    );

    let cartBtn = document.createElement("button");
    cartBtn.innerText = "Add to Cart";
    cartBtn.classList.add("cart-btn");

    cartBtn.addEventListener("click", () => handleCart(ele));

    groupBtn.append(Buybtn, cartBtn);

    let div = document.createElement("div");
    div.className = "main-div";
    div.classList.add("product-box");
    
    div.append(img, title, price, category, groupBtn);
    document.getElementById("productlist").append(div);
  });
};

mapper(products);

// sorting

const handleSort = (orderBy) => {
  if (orderBy === "lth") {
    let temp = products.sort((a, b) => a.price - b.price);
    mapper(temp);
  } else if (orderBy === "htl") {
    let temp = products.sort((a, b) => b.price - a.price);
    mapper(temp);
  }
};

document.getElementById("sortDropdown").addEventListener("change", (event) => {
  handleSort(event.target.value);
});

// filtering

const handleCategory = (category) => {
  let temp = products.filter((ele) => ele.category == category);
  mapper(temp);
};

document
  .getElementById("men")
  .addEventListener("click", () => handleCategory("men"));
document
  .getElementById("women")
  .addEventListener("click", () => handleCategory("women"));

document
  .getElementById("kids")
  .addEventListener("click", () => handleCategory("kids"));

  
// document
//   .getElementById("electronics")
//   .addEventListener("click", () => handleCategory("electronics"));





// searching

const handleSearch = (e) => {
  e.preventDefault();

  let searchInput = document.getElementById("search").value;

  let temp = products.filter((ele) =>
    ele.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  mapper(temp);
};

document.getElementById("searchProduct").addEventListener("click", handleSearch);


// cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const isExist = (id) => {
  let flag = false;
  cart.map((ele, i) => {
    if (ele.id == id) {
      cart[i].qty = cart[i].qty + 1;
      flag = true;
      alert("Quantity added Successfully!");
    }
  });
  return flag;
};

const handleCart = (ele) => {
  if (!isExist(ele.id)) {
    cart.push({ ...ele, qty: 1 });
    alert("added to cart");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
};
