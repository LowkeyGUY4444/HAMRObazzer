import React from 'react'
import { FiSearch } from "react-icons/fi";
import { useState } from 'react';
import { HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../../redux/slices/productsSlice'


const SearchBar = () => {

const [searchTerm, setSearchTerm] = useState('');
const [isOpen, setIsOpen] = useState(false);
const dispatch= useDispatch();
const navigate= useNavigate();

const handleSearchToggle = () => {
    setIsOpen(!isOpen);
};
const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({search: searchTerm}));
    navigate(`/collections/all?search=${searchTerm}`)
    setIsOpen(false);
    // Perform search action with searchTerm  
}

  return(
    <div className={`flex items-center justify-center w-full transition-all duration-300 
        ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>

        {isOpen ? (
            // form submit Data

            <form onSubmit={handleSearch} className='relative flex items-center justify-center w-full'>
            <div className='reative w-1/2'>
                <input type='text'
                 placeholder='Search...' 
                 value={searchTerm} 
                 onChange={(e) => setSearchTerm(e.target.value)}
                 autoFocus={true}
                 className='border border-gray-300 rounded-full py-2 px-4 pl-2 pr-12
                 w-full focus:outline-none focus:ring-2 focus:ring-TopBar-red'
                />
                {/* search Icon */}
                {/* <button 
                type='submit' 
                className="absolute top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                 >
                    <FiSearch className='h-6 w-6 text-gray-700' />
                </button> */}
            </div>
            
            {/* close icon */}
                <button
                 type='button'
                 onClick={handleSearchToggle}
                 >
                    <HiMiniXMark className='h-6 w-6 text-gray-700  hover:text-gray-800 absolute top-1/2 transform -translate-y-1/2' />

                </button>

        </form>
        ) :(
            <button onClick={handleSearchToggle}>
                <FiSearch className='h-6 w-6 text-gray-700' />
            </button>
        )}
        {/*  */}
    </div>
  );
};

export default SearchBar
