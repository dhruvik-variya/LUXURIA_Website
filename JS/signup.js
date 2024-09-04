import Navbar from "../Component/navbar.js";

document.getElementById("navbar").innerHTML = Navbar();


let user = JSON.parse(localStorage.getItem("user")) || [];

const  handledata = (e) => {

    e.preventDefault();

    let data ={
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    user.push(data);
    localStorage.setItem('user', JSON.stringify(user));
    alert("User SignUp successfully!");

    window.location.href = "./login.html";
      
}
document.querySelector("#form").addEventListener("submit", handledata);
