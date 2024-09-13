import Navbar from "../Component/navbar.js";   

document.getElementById("navbar").innerHTML = Navbar();

 let login = localStorage.getItem("login") || false;

    if (login == false) { 
    
        window.location.href = "/index.html";
        alert("please login first !!")

    } 

let products = JSON.parse(localStorage.getItem("products")) || [];

const handleSubmit = (e) => {
    e.preventDefault();

    let product = { 

        title :  document.getElementById("title").value, 
        price :  document.getElementById("price").value, 
        category :  document.getElementById("category").value, 
        img :  document.getElementById("img").value, 
        id : Date.now()
        
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    alert("add product successfull ")
 
};

document.getElementById("productdata").addEventListener("submit", handleSubmit);