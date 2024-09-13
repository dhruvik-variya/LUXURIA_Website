const Navbar = () => {

    let login=localStorage.getItem('login');
    let username=localStorage.getItem('username');

    return `
        <div class="container">
        <nav class="navbar">
            <div class="logo">
                <a href="../index.html">Navbar</a> 
            </div>
            <div>
                <ul class="menu">
                    <li class="menu-items"><a href="../index.html">Home</a></li>
                    <li class="menu-items"><a href="../Pages/product.html">Product</a></li>
                    <li class="menu-items"><a href="../Pages/addproduct.html">Add Product</a></li>
                    <li class="menu-items"><a href="../Pages/cart.html">Cart</a></li>
                    <li class="menu-items"><a href="../Pages/login.html" id="userlogout"> ${login ? "Logout" : "Login"} </a></li>
                    <li class="menu-items"><a href="../Pages/signup.html"> ${login ? username.substring(0,8)+"" : "SignUp"}</a></li>
                </ul>
            </div>
        </nav>
    </div>
    
    `

}

export default Navbar;