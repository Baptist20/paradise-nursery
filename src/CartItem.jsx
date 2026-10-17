import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPlants = items.reduce((sum, item) => sum + item.quantity, 0);
  const itemSubtotal = (item) => item.cost * item.quantity;
  const totalAmount = items.reduce((sum, item) => sum + itemSubtotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // quantity would reach 0, so remove the plant from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => dispatch(removeItem(item.name));

  const handleCheckout = () => alert('Coming Soon');

  return (
    <div className="cart-container">
      <h2 className="cart-summary">Total Plants in Cart: {totalPlants}</h2>
      <h2 className="cart-total">Total Cart Amount: ${totalAmount}</h2>

      {items.length === 0 && <p className="cart-empty">Your cart is empty. Add some plants!</p>}

      <div className="cart-items">
        {items.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit price: ${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button" onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name}`}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button" onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name}`}>+</button>
              </div>
              <div className="cart-item-total">Total: ${itemSubtotal(item)}</div>
            </div>
            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button className="continue-shopping" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="checkout" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
