import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { FaFilter } from "react-icons/fa";
import { useRef } from 'react';
import FilterSidebar from '../components/Products/FilterSidebar';
import ShortOption from '../components/Products/ShortOption';
import MayLike from '../components/Products/MayLike';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilter } from "../redux/slices/productsSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const quaryParams = Object.fromEntries([...searchParams]);

  //const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilter({ collection, ...quaryParams }))
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };


  useEffect(() => {
    //event listner for clicks
    document.addEventListener('mousedown', handleClickOutside);
    //clean event listner
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  });





  return (
    <div className='flex flex-col lg:flex-row'>
      <button
        onClick={toggleSidebar}
        className='lg:hidden border p-2 flex justify-center items-center'>
        <FaFilter className='mr-2' />
      </button>

      {/* filter sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 z-50 left-0  w-64 bg-white overflow-auto transition-transform duration-300 lg:static lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <FilterSidebar />
      </div>
      <div className='flex-grow p-4'>
        <h2 className='text-2xl mb-4 uppercase'>All collection</h2>

        {/* Short option */}
        <ShortOption />

        {/* Product Grid */}
        <MayLike products={products} loading={loading} error={error} />

      </div>
    </div>
  )
}

export default CollectionPage





