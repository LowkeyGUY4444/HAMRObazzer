import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser,HiOutlineShoppingBag} from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useState } from 'react';
import { useSelector } from 'react-redux';



const Navbar = () => {
    // for CartDrawer
    const [drawerOpen, setDrawerOpen] = useState(false);
    // for 3 dash
    const [navDropdownOpen, setNavDropdownOpen] = useState(false);

    const {cart}= useSelector((state)=> state.cart);
    const {user}= useSelector((state)=> state.auth);

    const cartItemCount= cart?.products?.reduce((total, product)=> total + product.quantity, 0) || 0;
    // navDrawer function
    const toggleNavDropdown = () => {
        setNavDropdownOpen(!navDropdownOpen);
    };
    // CartDrawer function
    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };


  return (
  <>
  <nav className='container mx-auto py-4 flex items-center justify-between px-4'>
    {/* left-logo */}
    <div>
    <Link to='/' className='text-2xl font-semibold text-gray-800'>HAMRObazzer</Link>
    </div>
    {/* center-links */}
    <div className='hidden md:flex items-center space-x-6'>
        <Link to='/collections/all' className='text-gray-700 hover:text-black font-medium uppercase'>All</Link>
        <Link to='/collections/all?gender=Men' className='text-gray-700 hover:text-black font-medium uppercase'>Men</Link>
        <Link to='/collections/all?gender=Women' className='text-gray-700 hover:text-black font-medium uppercase'>Women</Link>
        <Link to='/collections/all?category=Top Wear' className='text-gray-700 hover:text-black font-medium uppercase'>Topware</Link>
        <Link to='/collections/all?category=Bottom Wear' className='text-gray-700 hover:text-black font-medium uppercase'>bottemware</Link>
    </div>

    {/* Right-Icon */}
    <div className='flex items-center space-x-4'>
        {/* this is for profile for login page use /login */}
        {user && user.role === "admin" && (<Link to="/admin" className="block bg-black text-white px-2 rounded">Admin</Link>)}
        
        <Link to='/profile' className=' hover:text-black '>  
            <HiOutlineUser className='h-6 w-6 text-gray-700' />
        </Link>

        <button onClick={toggleCartDrawer} className='relative hover:text-black '>
            <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
            {cartItemCount > 0 &&(<span className='absolute -top-1  bg-TopBar-red text-white text-xs rounded-full px-2 py-0.5'>{cartItemCount}</span>)}
           
        </button>

    {/* Search */}
    <div className="overflow-hidden">
    <SearchBar />
    </div>

    {/* Menu */}
    <button onClick={toggleNavDropdown} className='md:hidden'>
        <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
    </button>

    </div>

  </nav>
  <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

  {/* mobile nav dropdown */}
 <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform 
    transition-transform duration-500 z-50 
    ${navDropdownOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        <div>
            <button>
                <MdClose className='h-6 w-6 text-gray-700 m-4' onClick={toggleNavDropdown} />
            </button>
        </div>

        {/* Menu */}
        <div className='p-4'>
            <h2 className='text-xl font-semibold mb-4'>Menu</h2>
            <nav className='space-y-4'>
                <Link to='/collections/all' onClick={toggleNavDropdown}  className='block text-gray-700 hover:text-black font-medium py-2 uppercase'>All</Link>
                <Link to='/collections/all?gender=Men' onClick={toggleNavDropdown}  className='block text-gray-700 hover:text-black font-medium py-2 uppercase'>Men</Link>
                <Link to='collections/all?gender=Women' onClick={toggleNavDropdown}  className='block text-gray-700 hover:text-black font-medium py-2 uppercase'>Women</Link>
                <Link to='/collections/all?category=Top Wear' onClick={toggleNavDropdown}  className='block text-gray-700 hover:text-black font-medium py-2 uppercase'>Top Wear</Link>    
                <Link to='/collections/all?category=Bottom Wear' onClick={toggleNavDropdown}  className='block text-gray-700 hover:text-black font-medium py-2 uppercase'>Bottom Wear</Link>
            </nav>
        </div>

  </div>
  </>
  )
}

export default Navbar
