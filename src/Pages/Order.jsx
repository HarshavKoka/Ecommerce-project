import React from 'react';
import { redirect, useLoaderData } from 'react-router-dom';
import { SectionTitle } from '../components';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';

// Pass store to loader when defining route
export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    console.log('Loader user:', user);

    if (!user || !user.token) {
      toast.warn('You must be logged in to view orders');
      return redirect('/login');
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await customFetch.get('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'There was an error accessing your orders';
      toast.error(errorMessage);

      if ([401, 403].includes(error?.response?.status)) {
        return redirect('/login');
      }

      return null;
    }
  };

const Order = () => {
  const { meta, orders } = useLoaderData();

  if (meta?.pagination?.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }

  return (
    <>
      <section>
        <SectionTitle text="Your Orders" />
        <ul>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <li>Order #{order.id}</li>
              <li>{order.address}</li>
            </React.Fragment>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Order;
