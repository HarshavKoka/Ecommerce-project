import React from 'react';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { Form, redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { clearCart } from '../features/cart/cartSlice';

// Action function to handle form submission
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);

    const user = store.getState().userState.user;
    const { cartItem, orderTotal, numberItemsInCart } =
      store.getState().cartState;

    // Prevent unauthorized users
    if (!user || !user.token) {
      toast.error('You must be logged in to place an order');
      return redirect('/login');
    }

    // Prepare payload including orderTotal
    const orderPayload = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal, // <== Include this to fix 400 error
      cartItems: cartItem,
      numItemsInCart: numberItemsInCart,
      user: user.id,
    };

    try {
      await customFetch.post('/orders', orderPayload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      store.dispatch(clearCart());
      toast.success('Order placed successfully');
      return redirect('/orders');
    } catch (error) {
      console.log('Order error:', error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'There was an error placing your order';
      toast.error(errorMessage);

      if ([401, 403].includes(error?.response?.status)) {
        return redirect('/login');
      }

      return null;
    }
  };

// Checkout form component
const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput type="text" label="First Name" name="name" required />
      <FormInput type="text" label="Address" name="address" required />
      <div className="mt-4">
        <SubmitBtn text="Place your order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
