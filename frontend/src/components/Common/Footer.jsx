import React from 'react'
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";




const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white border-t py-12 '>
      <div className='container mx-auto  grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
        <div>
            <h3 className='text-lg mb-4'>Newsletters</h3>
            <p className=' text-sm mb-4'>Be the first one to hear about new products, exclusive events, and online offers.</p>
            <p className='text-sm font-medium'>Sign up and get 10% off on your first order.</p>
            <form className='flex mb-4'>
                <input 
                    type='email'
                    placeholder='Enter your email'
                    className='w-full px-4 py-2 rounded-l bg-gray-700 text-white focus:outline-none'
                    required
                />
                <button 
                    type='submit'
                    className='bg-TopBar-red text-white px-4 py-2 rounded-r hover:bg-red-600 transition-colors'
                >
                    Subscribe
                </button>
            </form>
            
        </div>

        {/* shopLinks */}
        <div>
            <h3 className='text-lg mb-4'>Shop</h3>
            <ul className='space-y-2'>
                <li><a href='#' className='hover:underline'>Men's Top Wear</a></li>
                <li><a href='#' className='hover:underline'>Women's Top Wear</a></li>
                <li><a href='#' className='hover:underline'>Men's Bottom Wear</a></li>
                <li><a href='#' className='hover:underline'>Women's Bottom Wear</a></li>
                
            </ul>
        </div>

        {/* supportLinks */}
        <div>
            <h3 className='text-lg mb-4'>Support</h3>
            <ul className='space-y-2'>
                <li><a href='#' className='hover:underline'>Contact us</a></li>
                <li><a href='#' className='hover:underline'>About us</a></li>
                <li><a href='#' className='hover:underline'>FAQ</a></li>
                <li><a href='#' className='hover:underline'>Features</a></li>
            </ul>
        </div>

        {/* Follow us */}
            <div>
                <h3 className='text-lg mb-4'>Follows us</h3>
                <div className='flex items-center space-x-4 mb-6'>
                    <a href='#' target='_blank' rel='noopener noreferrer' className='hover:underline'><TbBrandMeta className='h-6 w-6' /></a>
                    <a href='#' target='_blank' rel='noopener noreferrer' className='hover:underline'><IoLogoInstagram className='h-6 w-6' /></a>
                    <a href='#' target='_blank' rel='noopener noreferrer' className='hover:underline'><RiTwitterXLine className='h-6 w-6' /></a>
                </div>
                <p className='text-sm'>Contact:</p>
                <p><FiPhoneCall className='inline-block mr-2'/>+97 984882026</p>
            </div>        
      </div>

      {/* footer Bottom */}
      <div className='container mx-auto text-center mt-12 px-4 lg:px-0 border-t pt-6'>
        <p className='text-sm'>&copy; {new Date().getFullYear()} HAMRObazzer. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

