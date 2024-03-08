import React, { useState, createContext, useContext } from "react";
import { MainShopPage } from "./pages/shop/index";
import { ShoppingCart } from "./pages/cart/shopppingCart";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += product.quantity;
      setCart(updatedCart);
    } else {
      const ob = {
        id: product.id,
        itemName: product.name,
        price: product.price,
        quantity: product.quantity,
      };
      setCart([...cart, ob]);
    }
  };

  const decrementFromCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingProductIndex].quantity - 1 === 0) {
        console.log(
          setCart(
            updatedCart.filter((item) => {
              if (item.id !== product.id) return item;
            })
          )
        );
      } else {
        updatedCart[existingProductIndex].quantity -= 1;
        setCart(updatedCart);
      }
    }
  };

  const idsInOrder = () => {
    return cart.map((product) => product.id);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decrementFromCart,
        calculateTotalPrice,
        idsInOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function App() {
  return (
    <>
      <div>
        <CartProvider>
          <Router>
            <nav style={{ margin: 10 }}>
              <Link to="/" style={{ padding: 5 }}>
                Shop
              </Link>
              <Link to="/cart" style={{ padding: 5 }}>
                Cart
              </Link>
            </nav>
            <Routes>
              <Route path="/" element={<MainShopPage />} />
              <Route path="/shop" element={<MainShopPage />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
          </Router>
        </CartProvider>
      </div>
    </>
  );
}

export default App;
