import React from 'react'
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";


const TopBar = () => {
  return <div className='bg-TopBar-red text-white'>
      <div className='container mx-auto flex items-center justify-between py-3'>
        <div className='hidden md:flex items-center space-x-4'>
            <a href='#' className='hover:text-gary-300'>
                 <TbBrandMeta className='h-6 w-6' />
            </a>
            <a href='#' className='hover:text-gary-300'>
                 <IoLogoInstagram  className='h-6 w-6' />
            </a>
            <a href='#' className='hover:text-gary-300'>
                 <RiTwitterXLine  className='h-6 w-6' />
            </a>
        </div>
        <div className='text-sm text-center flex-grow'>
            <span>Super Deal! Free Shipping on Orders Over Rs.50</span>
        </div>
        <div className='text-sm hidden md:block'>
            <a href='tel:+97 9848820267' className='hover:text-gary-300'>+97 9848820267</a>
        </div>
      </div>
    </div>
    
  
}

export default TopBar
