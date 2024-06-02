import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ cart, setCart, orders, setOrders }) => {
  const [step, setStep] = useState(1);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiApp, setUpiApp] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const handleOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      products: [...cart],
      address: `${addressLine1}, ${addressLine2}, ${city}, ${state}, ${pincode}`,
      phoneNumber: phoneNumber
    };
    setOrders([...orders, newOrder]);
    setCart([]);
    toast.success('Order placed successfully!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    toast.success('Payment successful!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      handleOrder(e);
    }, 1500); 
  };

  return (
    <div className="container checkout-container">
      <ToastContainer />
      <h1 className="text-center">Checkout</h1>
      <form onSubmit={step === 1 ? handleNextStep : handleOrder} className="checkout-form">
        {step === 1 && (
          <>
            <div className="form-group">
              <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
              <textarea 
                className="form-control" 
                id="addressLine1" 
                value={addressLine1} 
                onChange={(e) => setAddressLine1(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="addressLine2" className="form-label">Address Line 2</label>
              <textarea 
                className="form-control" 
                id="addressLine2" 
                value={addressLine2} 
                onChange={(e) => setAddressLine2(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="landmark" className="form-label">Landmark (Optional)</label>
              <input 
                type="text" 
                className="form-control" 
                id="landmark" 
                value={landmark} 
                onChange={(e) => setLandmark(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="state" className="form-label">State</label>
              <select 
                className="form-control" 
                id="state" 
                value={state} 
                onChange={(e) => setState(e.target.value)} 
                required
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Goa">Goa</option>
                <option value="Assam">Assam</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="city" className="form-label">City</label>
              <input 
                type="text" 
                className="form-control" 
                id="city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="pincode" className="form-label">Pincode</label>
              <input 
                type="text" 
                className="form-control" 
                id="pincode" 
                value={pincode} 
                onChange={(e) => setPincode(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input 
                type="text" 
                className="form-control" 
                id="phoneNumber" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email (Optional)</label>
              <input 
                type="text" 
                className="form-control" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <button type="submit" className="btn btn-primary my-2">Next</button>
          </>
        )}

       
{step === 2 && (
          <>
            <div className="form-group">
              <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
              <select 
                className="form-control" 
                id="paymentMethod" 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                required
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="upi">UPI Payment</option>
                <option value="card">Card Payment</option>
                <option value="cod">Cash on Delivery (COD)</option>
              </select>
            </div>
            {paymentMethod === 'upi' && (
              <>
                <div className="form-group">
                  <label htmlFor="upiApp" className="form-label">Select UPI App</label>
                  <select 
                    className="form-control" 
                    id="upiApp" 
                    value={upiApp} 
                    onChange={(e) => setUpiApp(e.target.value)} 
                    required
                  >
                    <option value="" disabled>Select UPI App</option>
                    <option value="paytm">Paytm</option>
                    <option value="gpay">Google Pay</option>
                    <option value="phonepe">PhonePe</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="upiId" className="form-label">UPI ID</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="upiId" 
                    value={upiId} 
                    onChange={(e) => setUpiId(e.target.value)} 
                    required 
                  />
                </div>
                <button type="button" onClick={handlePayment} className="btn btn-success my-2">Pay Now</button>
              </>
            )}
            {paymentMethod === 'card' && (
              <>
                <div className="form-group">
                  <label htmlFor="cardNumber" className="form-label">Card Number</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="cardNumber" 
                    value={cardNumber} 
                    onChange={(e) => setCardNumber(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv" className="form-label">CVV</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="cvv" 
                    value={cvv} 
                    onChange={(e) => setCvv(e.target.value)} 
                    required 
                  />
                </div>
                <button type="button" onClick={handlePayment} className="btn btn-success my-2">Pay Now</button>
              </>
            )}
            {paymentMethod === 'cod' && (
              <button type="submit" className="btn btn-success my-2">Place Order</button>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default Checkout;

