import React from 'react';
import ReactDOM from 'react-dom/client';
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
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/> 
  </React.StrictMode>
);


