import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    const missingSizeItems = cart.filter(item => !item.size);
    if (missingSizeItems.length > 0) {
      toast.error('Please select a Size', {
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
    navigate('/checkout');
  };

  const handleSizeChange = (index, size) => {
    const updatedCart = [...cart];
    updatedCart[index].size = size;
    setCart(updatedCart);
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
      <div className="container my-5" style={{ width: "53%" }}>
        {cart.length === 0 ? (
          <div className='text-center'>
            <h1>Your Cart is Empty</h1>
            <Link to={"/"} className='btn btn-warning'>Continue Shopping...</Link>
          </div>
        ) : cart.map((product, index) => (
          <div key={product.id} className="card mb-3 my-5" style={{ width: '700px' }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={product.imgSrc} className="img-fluid rounded-start" alt={product.title} />
              </div>
              <div className="col-md-8">
                <div className="card-body text-center">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  {product.size ? (
                    <p>Size: {product.size}</p>
                  ) : (
                    <div className="my-3">
                      <label htmlFor={`sizeSelect-${index}`} className="form-label">Select Size:</label>
                      <select
                        id={`sizeSelect-${index}`}
                        className="form-select"
                        value={product.size || ''}
                        onChange={(e) => handleSizeChange(index, e.target.value)}
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
                  )}
                  <button className="btn btn-primary mx-2.5">
                    Rs. {product.price}
                  </button>
                  <Link to={`/product/${product.id}`}>
                    <button className="btn btn-warning mx-2">View Product</button>
                  </Link>
                  <button 
                    className="btn btn-warning mx-2"
                    onClick={handleCheckout}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length !== 0 && (
        <div className="container text-center my-5" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button 
            className='btn btn-warning mx-5'
            onClick={handleCheckout}
          >
            CheckOut
          </button>
          <button onClick={() => setCart([])} className='btn btn-danger'>Clear Cart</button>
        </div>
      )}
    </>
  );
};

export default Cart;
