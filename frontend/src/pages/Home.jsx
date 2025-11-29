import React, { useEffect } from 'react'
import Hero from '../components/Layout/Hero';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import GenderCollection from '../components/Products/GenderCollection';
import NewArrivals from '../components/Products/NewArrivals';
import ProductDetails from '../components/Products/ProductDetails';
import Maylike from '../components/Products/MayLike';
import FeatureSection from '../components/Products/FeatureSection';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useState } from 'react';
import { fetchProductsByFilter } from "../redux/slices/productsSlice";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}`

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // fetch product for specific collection 
    dispatch(fetchProductsByFilter({
      gender: "Men",
      category: "Top Wear",
      limit: 8,
    })
    );
    // fetch best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      {/* Best Seller */}
      <h2 className='text-3xl font-bold mb-4 text-center'>Best Seller</h2>
      {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : (
        <p className='text-center'>Loading best seller product ....</p>
      )}

      {/* collection for  Women section */}
      <div className='container mx-auto border-b border-gray-300 '>
        <h2 className='text-3xl font-bold mb-4 text-center'>
          Top Wares for Men
        </h2>
        <Maylike products={products} loading={loading} error={error} />
      </div>
      <FeatureSection />


    </div>
  );
};

export default Home
