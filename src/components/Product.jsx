import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({ items, cart, setCart }) => {
  const navigate = useNavigate();

  const addToCart = (product) => {
    const obj = { ...product, size: null }; 
    setCart([...cart, obj]);
    toast.success('Item added to cart', {
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

  const handleBuyNow = (product) => {
    if (!product.size) {
      toast.error('Please select a size before proceeding to checkout.', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(`/product/${product.id}`);
    } else {
      setCart([product]);
      navigate('/checkout');
    }
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
      <div className="container my-5">
        <div className="row">
          {items.map((product) => (
            <div key={product.id} className="col-lg-4 col-md-6 my-3 text-center">
              <div className="card" style={{ width: "18rem" }}>
                <Link to={`/product/${product.id}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={product.imgSrc} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <button className="btn btn-primary mx-1">Rs. {product.price}</button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="btn btn-warning mx-1"
                  >Buy Now</button>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn btn-warning my-2"
                  >Add To Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;