import './App.css';
import NavBar from './components/NavBar';
import Home from './Pages/Home';
import Products from "./components/Products"
import Product from "./components/Product"
import { CartContext } from './Pages/CartContex';
import Cart from './Pages/Cart';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect } from 'react';




function App() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const cart = window.localStorage.getItem("cart");
    setCart(JSON.parse(cart));

  }, [])

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])
  console.log(cart);

  return (
    <div >

      <BrowserRouter>
        <CartContext.Provider value={{ cart, setCart }}>
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/products" exact element={<Products />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/products/:_id" exact element={<Product />} />

          </Routes>
        </CartContext.Provider>



      </BrowserRouter>

    </div>
  );
}

export default App;
