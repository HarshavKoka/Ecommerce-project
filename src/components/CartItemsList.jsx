import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItem);
  return (
    <>
      {cartItems.map((item, index) => (
        <CartItem key={item.id || index} cartItem={item} />
      ))}
    </>
  );
};

export default CartItemsList;
