import React from 'react'
import TopBar from '../Layout/TopBar';
import Navbar from './Navbar';

const Header = () => {
  return <header className='border-b border-gray-300'>
    {/* TopBar */}
    <TopBar />
    {/* Navbar */}
    <Navbar />
    {/* Cart Drawer */}
  </header>
};

export default Header
