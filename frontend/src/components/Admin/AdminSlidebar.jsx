import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaUser, FaBoxOpen, FaClipboardList, FaStore, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { clearCart } from '../../redux/slices/cartSlice';

const AdminSlidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <Link to='/' className='text-2xl font-medium'>HAMRObazar</Link>
      </div>
      <Link to='/admin' className='text-xl font-medium  text-center ml-4 '>Admin Dashbord</Link>
      <nav>
        {/* USER */}
        <NavLink to="/admin/users" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
          : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
          <FaUser />
          <span>Users</span>
        </NavLink>

        {/* PRODUCTS */}
        <NavLink to="/admin/products" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
          : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        {/* ORDERS */}
        <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
          : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        {/* Shop */}
        {/* <NavLink to="/admin/shop" className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
         : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaStore />
            <span>Shop</span>
         </NavLink> */}


        <NavLink to="/" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
          : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
          <FaStore />
          <span>Shop</span>
        </NavLink>

      </nav>

      <div className='mt-6'>
        <button
          onClick={handleLogout}
          className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center w-full'>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default AdminSlidebar
