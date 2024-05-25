import React from 'react';
import ReactDOM from 'react-dom';
import Membership from "./pages/Membership/Membership";
import Support from "./pages/Support";
import{createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from './pages/Home/Home';
import Opportunities from './pages/Opportunities';
import LoginForm from './pages/Login/LoginForm';
import Register from "./pages/Register/RegisterForm";
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Manager from './pages/Manager/Manager';
import ManagerMembership from './pages/ManagerMembership/ManagerMembership';
import Internships from './pages/Internships/Internships';
import Notification from './pages/Notification/Notification';
import Store from './pages/Store/Store';
import Category from './pages/Category/Category';
import AddProduct from './pages/AddProduct/AddProduct';
import ProductPage from './pages/ProductPage/ProductPage';
import { CartProvider } from './helper/CartContext';
import FeaturedProducts from './pages/FeaturedProducts/FeautredProducts';
import CartPage from './pages/CartPage/CartPage';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: '/membership',
    element: <Membership/>
  },
  {
    path: '/Support',
    element: <Support/>
  },
  {
    path: '/Opportunities',
    element: <Opportunities/>
  },
  {
    path:'/login',
    element:<LoginForm/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path: '/profile/:isManager', // Include isManager parameter in the URL
    element: <ProfilePage/>
  },
  {
    path: '/manager',
    element: <Manager/>
  },
  {
    path: '/managermembership',
    element: <ManagerMembership/>
  },
  {
    path: '/internship',
    element: <Internships/>
  },
  {
    path: '/notification/:memberId/:isMember',
    element: <Notification />
  },
  {
    path: '/Store',
    element: <Store/>
  },
  {
    path: '/Store/Category/:title',
    element: <Category/>
  },
  {
    path:'/profile/:isManager/AddProduct/:memberId',
    element:<AddProduct/>
  },
  {
    path: '/Store/:id',
    element:<ProductPage/>
  },
  {
    path:'/Cart',
    element:<CartPage/>
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router}>
        <ProductPage />
        <FeaturedProducts/> 
        <CartPage/>
      </RouterProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


