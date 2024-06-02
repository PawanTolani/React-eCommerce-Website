import React from 'react';

const Orders = ({ orders }) => {
  return (
    <div className="container my-5">
      <h1 className="text-center">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center">
          <h2>No orders placed yet.</h2>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item my-3 p-3 border rounded">
              <h3>Order {index + 1}</h3>
              <p>Address: {order.address}</p>
              <p><em>Your item is ready to be shipped.</em></p>
              {order.products.map((item, idx) => (
                <div key={idx} className="order-product d-flex align-items-center my-2">
                  <img 
                    src={item.imgSrc} 
                    alt={item.title} 
                    className="order-product-image" 
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }}
                  />
                  <div>
                    <p><strong>{item.title}</strong></p>
                    <p>Price: Rs. {item.price}</p>
                    {item.size && <p>Size: {item.size}</p>}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
