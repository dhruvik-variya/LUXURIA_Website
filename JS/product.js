import Navbar from "../Component/navbar.js"; 
import createTag from "../Component/helper.js"; 



document.getElementById("navbar").innerHTML = Navbar();

let products = JSON.parse(localStorage.getItem("products")) || [];
console.log(products);

const mapper = (data) => {

    data.map((ele)   => {
        
        let title = createTag("h3", ele.title);
        let price = createTag("p", ele.price);
        let img = createTag("img", ele.img);
        let category = createTag("p", ele.category);

        let div = document.createElement("div");
        div.append(img,title,price,category);
        document.getElementById("productlist").append(div); 
        
    })


}

mapper(products);