import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../../store/cartSlice'; 
import { cartItemsSelector } from './CartSidebarSelector';
import { cartPrice } from '../utils/cartPrice';
import './CartSideBar.scss';

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(cartItemsSelector);


  const totalPrice = cartPrice(cartItems);

  const basePath = '/products';

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>

      <div className="sidebar-header">
        <h2>CART</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close cart">✕</button>
      </div>

      <div className="sidebar-body">
        {cartItems.length === 0 ? (
          <p className="empty-msg">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={`${basePath}/${item.sku}_1.jpg`}
                alt={item.title}
                className="item-thumbnail"
              />
              <div className="item-details">
                <h4>{item.title}</h4>
                <p className="item-description">{item.description}</p>
                <p className="item-quantity">Quantity: {item.quantity}</p>
              </div>
              <span className="item-price">
                {item.currencyFormat}{item.price}
              </span>
              <button
                className="remove-btn"
                onClick={() => dispatch(removeFromCart(item.id))}
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="sidebar-footer">
          <div className="subtotal">
            <span>Subtotal : $ {totalPrice.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">CHECKOUT</button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
