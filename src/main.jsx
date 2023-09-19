import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Layout/Home.jsx';
import Shop from './components/Shop/Shop.jsx';
import Orders from './components/Orders/Orders.jsx';
import Inventory from './components/Inventory/Inventory.jsx';
import cartProductsLoader from './loaders/cartProductsLoader.js';
import Checkout from './components/Checkout/Checkout.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import AuthProviders from './providers/AuthProviders.jsx';
import PrivateRoute from './PrivateRoutes/PrivateRoute.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Shop></Shop>
      },
      {
        path: '/orders',
        element: <Orders></Orders>,
        loader: cartProductsLoader
      },
      {
        path: '/inventory',
        element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/checkout',
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders> <RouterProvider router={router}></RouterProvider></AuthProviders>
  </React.StrictMode>,
)
