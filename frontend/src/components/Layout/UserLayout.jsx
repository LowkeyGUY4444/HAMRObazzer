import React from 'react'
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import Home from '../../pages/Home';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return(
  <>
  {/* Header */}
  <Header /> 

  {/* Main content */}
  <main className='min-h-screen container mx-auto px-4 py-8'>
    <Outlet />
  </main>

  {/* Footer */}
  <Footer />
  </>
    );
};

export default UserLayout
