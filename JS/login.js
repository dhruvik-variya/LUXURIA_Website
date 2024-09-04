import Navbar from "../Component/navbar.js";

document.getElementById("navbar").innerHTML = Navbar();

let user = JSON.parse(localStorage.getItem("user")) || [];



const handledata = (e) => {
  e.preventDefault();

  let data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  let match = user.filter(
    (ele) => ele.email == data.email && ele.password == data.password
  );

  if (match.length > 0) {

    alert("User Login successfully!");

    localStorage.setItem("username", match[0].name);

    localStorage.setItem("login", true);

    window.location.href = "/index.html";
  }

  else if (data.email == "" || data.password == "") {
    alert("Email and Password are required");
  }
   
  else {
    alert("Invalid Email or Password");
  }
};

// logout

const logout = document.getElementById("userlogout");

if(logout){
    logout.addEventListener("click", () => {
        localStorage.removeItem("username");
        localStorage.removeItem("login");
        window.location.href = "/index.html";
    });
}
else{
    console.log("logout button not found");
}





document.querySelector("#form").addEventListener("submit", handledata);