import Navbar from "../Component/navbar.js"; 
import createTag from "../Component/helper.js"; 

document.getElementById("navbar").innerHTML = Navbar();

let products = JSON.parse(localStorage.getItem("products")) || [];
console.log(products);

const mapper = (data) => {
    document.getElementById("productlist").innerHTML = "";

    if (data.length === 0) {
        document.getElementById("productlist").innerHTML = "No products available";
        return;
    }

    data.map((ele) => {
        let title = createTag("h3", ele.title);
        let price = createTag("p", `$${ele.price}`);
        let img = createTag("img", ele.img);
        let category = createTag("p", ele.category);

        let buyButton = document.createElement("button");
        buyButton.innerText = "Add to Cart";
        buyButton.classList.add("buy-btn");

        buyButton.addEventListener("click", () => handleCart(ele));

        let div = document.createElement("div");
        div.classList.add("product-box");
        div.append(img, title, price, category, buyButton);
        document.getElementById("productlist").append(div);

    });
}

mapper(products);

// sorting 

const handleSort = (orderBy) =>{
    if(orderBy == "lth"){
        let temp = products.sort((a, b) => a.price - b.price);

        mapper(temp);
    }
    else{
        let temp = products.sort((a, b) => b.price - a.price);
        
        mapper(temp); 
    }
}


document.getElementById("lth").addEventListener("click", () =>handleSort("lth"));
document.getElementById("htl").addEventListener("click", () =>handleSort("htl"));


// filtering

const handleCategory = (category) => {
    let temp = products.filter((ele) => ele.category == category);
    mapper(temp);
}


document.getElementById("men").addEventListener("click", () => handleCategory("men"));
document.getElementById("women").addEventListener("click", () => handleCategory("women"));
document.getElementById("electronics").addEventListener("click", () => handleCategory("electronics"));

// searching

const handleSearch = (e) => {
    e.preventDefault();

    let searchInput = document.getElementById("search").value;

    let temp = products.filter((ele) => ele.title.toLowerCase().includes(searchInput.toLowerCase()));
    
    mapper(temp);
}

document.getElementById("searching").addEventListener("submit", handleSearch);



// cart  

let cart =  JSON.parse(localStorage.getItem("cart"))||[]

const isExist = (id) => { 

    let flag = false;
    cart.map((ele, i) => {

        if (ele.id == id) {

            cart[i].qty = cart[i].qty + 1
            flag = true;
            alert("Quantity added Successfully!")

        }
    })
    return flag;

}


const handleCart = (ele) => {
    if (!isExist(ele.id)) {
        cart.push({ ...ele, qty: 1 });
        alert("added to cart");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);

}