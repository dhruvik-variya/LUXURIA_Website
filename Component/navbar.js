const Navbar = () => {

    let login=localStorage.getItem('login');
    let username=localStorage.getItem('username');

    return `

    
      <div class="nav__logo">
        <a href="/index.html">LUXURIA<span>.</span></a>
      </div>

      <ul class="nav__links">
        <li class="link"><a href="/index.html">Home</a></li>
        <li class="link"><a href="../Pages/product.html">Shop</a></li>
        <li class="link"><a href="../Pages/addproduct.html">Add Product</a></li>
        <li class="link"><a href="../Pages/login.html" id="userlogout"> ${login ? "Logout" : "Login"} </a></li>
        <li class="link"><a href="../Pages/signup.html"> ${login ? username.substring(0,8)+"" : "SignUp"} </a></li>
      </ul>

      <div class="nav__icons">
        <span>
          <a href="#"><i class="ri-user-line"></i></a>
        </span>
        <span>
          <a href="../Pages/cart.html"><i class="ri-shopping-bag-line"></i></a>
        </span>
      </div>
    
    
    `

}

export default Navbar;

