import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { items } from "./Data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from './Product';

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const filterProduct = items.find((product) => product.id === parseInt(id));
    setProduct(filterProduct);

    const relatedProducts = items.filter(
      (prod) => prod.category === filterProduct.category && prod.id !== filterProduct.id
    );

    setRelatedProducts(relatedProducts);
  }, [id]);

  const addToCart = (product) => {
    if (!selectedSize) {
      toast.error("Please select a size", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setCart([...cart, { ...product, size: selectedSize }]);
    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setCart([{ ...product, size: selectedSize }]);
    toast.success("Product added to cart. Proceed to checkout.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate('/checkout');
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container con">
        <div className="img">
          <img src={product.imgSrc} alt="" />
        </div>
        <div className="text-center">
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <div className="my-3">
            <label htmlFor="sizeSelect" className="form-label">Select Size:</label>
            <select
              id="sizeSelect"
              className="form-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Select Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          <button className="btn btn-primary mx-3">Rs. {product.price}</button>
          <button
            onClick={() => addToCart(product)}
            className="btn btn-warning mx-3"
          >
            Add To Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="btn btn-success"
          >
            Buy Now
          </button>
        </div>
      </div>
      <h1 className="text-center">Related Products</h1>
      <Product cart={cart} setCart={setCart} items={relatedProducts} />
    </>
  );
};

export default ProductDetail;
