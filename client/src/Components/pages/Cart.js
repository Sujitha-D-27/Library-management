import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div>
      <h2>Booking Cart</h2>
      {cartItems.map((item) => (
        <div key={item.ID} className="cart-item">
          <p>{item.Title}</p>
          <button onClick={() => removeFromCart(item.ID)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
