import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  About,
  Cart,
  HomeLayout,
  Checkout,
  Error,
  Landing,
  Login,
  Order,
  Products,
  SingleProduct,
  Register,
} from './Pages';
import { ErrorElement } from './components';
import { loader as LandingLoader } from './Pages/Landing';
import { loader as SingleProductLoader } from './Pages/SingleProduct';
import { loader as ProductsLoader } from './Pages/Products';
import { loader as checkoutLoader } from './Pages/Checkout';
import { loader as ordersLoader } from './Pages/Order';

import { action as registerAction } from './Pages/Register';
import { action as loginAction } from './Pages/Login';
import { action as checkoutAction } from './components/CheckoutForm';

import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, //5min
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: LandingLoader(queryClient),
        errorElement: <ErrorElement />,
      },
      {
        path: 'products',
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: ProductsLoader(queryClient),
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: SingleProductLoader(queryClient),
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: 'orders',
        element: <Order />,
        loader: ordersLoader(store),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
