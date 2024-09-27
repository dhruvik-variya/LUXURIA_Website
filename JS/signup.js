import Navbar from "../Component/navbar.js";
import footer from "../Component/footer.js";


document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("Footer").innerHTML = footer();



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

 
 // logout
const logout = document.getElementById("userSignup");

if(logout) {
    logout.addEventListener("click", () => {
        localStorage.removeItem("username");
        localStorage.removeItem("login");
        window.location.href = "/index.html";
    });
}
else{
    console.log("logout button not found");
}