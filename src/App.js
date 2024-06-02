import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import SearchItem from './components/SearchItem';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import Footer from './components/Footer'; 
import { items } from './components/Data';

const App = () => {
  const [data, setData] = useState([...items]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <Router>
      <Navbar cart={cart} setData={setData} />
      <Routes>
        <Route path="/" element={<Product cart={cart} setCart={setCart} items={data} />} />
        <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} />} />
        <Route path="/search/:term" element={<SearchItem cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} />} />
        <Route path="/orders" element={<Orders orders={orders} />} />
      </Routes>
      <Footer /> 
    </Router>
  );
};

export default App;
