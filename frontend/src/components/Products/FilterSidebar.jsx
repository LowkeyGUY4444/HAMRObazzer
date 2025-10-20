import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category:'',
    gender: '',
    color:'',
    size:[],
    material:[],
    brand:[],
    minPrice: 100,
    maxPrice: 20000,
  })

const [priceRange, setPriceRange] = useState([100, 20000]);
const category=['Top Wear', 'Bottom Wear',];
const gender=['Men', 'Women',];
const color=['Black', 'Blue', 'White', 'Red', 'Pink',];
const size=['XS','S', 'M', 'L', 'XL','XXL',];
const material=['Cotton', 'Silk', 'Denim','leather',];
const brand=['Nike', 'Adidas', 'Puma', 'Reebok' ,];

useEffect(() => { 
 const params = Object.fromEntries(searchParams);
 setFilters({
  category: params.category || '',
  gender: params.gender || '',
  color: params.color || '',
  size: params.size ? params.size.split(',') : [],
  material: params.material ? params.material.split(',') : [],
  brand: params.brand ? params.brand.split(',') : [],
  minPrice: params.minPrice || 100,
  maxPrice: params.maxPrice || 20000,
 });
     setPriceRange([
      Number(params.minPrice) || 100, 
      Number(params.maxPrice) || 20000,
    ]);
  }, [searchParams]); 

const handleFilterChange = (e) => {
  const {name, value,  checked, type} = e.target;
  // console.log(name, value, type, checked);
  let newFilters = {...filters};
  if(type === 'checkbox'){
    if(checked){
      newFilters[name] = [...(newFilters[name] || []), value];   
    }
    else{
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    }
  else{
      newFilters[name] =value;
    }
    setFilters(newFilters); 
    updateURLParams(newFilters); 
    console.log(newFilters);
  };
  

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    //{catrgory:"top ware", size["xs","s"]}
    Object.keys(newFilters).forEach((key) => {
      if(Array.isArray(newFilters[key]) && newFilters[key].length > 0){
        params.append(key, newFilters[key].join(','));
      }
      else if(newFilters[key]){
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  //for Prise Range
  const handlePriceChange = (e) => {
    const newPrice=e.target.value;
    setPriceRange([100,newPrice]);
    const newFilters={...filters, minPrice:100, maxPrice: newPrice};
    setFilters(filters);
    updateURLParams(newFilters);
  };

 
  return (
    <div className='p-4'>
      <h3 className='text-xl font-semibold mb-4 text-gray-700'>Filter</h3>

      {/* Category */}
      <div className='mb-6'>
        <label className='block text-gray-700  font-medium mb-2'>Category</label>
        {category.map((category) => (
          <div key={category} className='flex items-center mb-1'>
            <input 
              type='radio'
              name='category'
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'               
            />
            <span className='text-gray-700 cursor-pointer'>{category}</span>
          </div>
          
            ))}       
      </div>
      {/* Gender */}
      <div className='mb-6'>
        <label className='block text-gray-700 font-medium mb-2'>Gender</label>
        {gender.map((gender) => (
          <div key={gender} className='flex items-center mb-1'>
            <input 
              type='radio'
              name='gender'
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'               
            />
            <span className='text-gray-700 cursor-pointer'>{gender}</span>
          </div>
          
            ))}       
      </div>
      {/* Color */}
      <div className='mb-6'>
        <label className='block text-gray-700 font-medium mb-2'>Color</label>
        <div className='flex flex-wrap gap-2'>
        {color.map((color) => (
          <button
            key={color}
            name='color'
            value={color}
            onClick={handleFilterChange}                      
            className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105
               ${filters.color === color ? 'ring-2 bg-blue-500' : ''}`}
            style={{backgroundColor: color.toLowerCase()}}
          ></button>
        ))}   
        </div>    
      </div>
      {/* size */}
      <div className='mb-6'>
        <label className='block text-gray-700 font-medium mb-2'>Size</label>
            {size.map((size) => (
              <div key={size} className='flex items-center mb-1'>
            <input 
              type='checkbox'
              name='size'
              value={size}
              checked={filters.size.includes(size)}
              onChange={handleFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'               
            />
            <span className='text-gray-700 cursor-pointer'>{size}</span>
          </div>
            ))}
      </div>
      {/* material */}
      <div className='mb-6'>
        <label className='block text-gray-700 font-medium mb-2'>Material</label>
            {material.map((material) => (
              <div key={material} className='flex items-center mb-1'>
            <input 
              type='checkbox'
              name='material'
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'               
            />
            <span className='text-gray-700 cursor-pointer'>{material}</span>
          </div>
            ))}
      </div>
      {/* brand */}
      <div className='mb-6'>
        <label className='block text-gray-700 font-medium mb-2'>Brand</label>
            {brand.map((brand) => (
              <div key={brand} className='flex items-center mb-1'>
            <input 
              type='checkbox'
              name='brand'
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'               
            />
            <span className='text-gray-700 cursor-pointer'>{brand}</span>
          </div>
            ))}
      </div>
      {/* Prise range */}

      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-2">Price Range</label>
        <input
          type="range"
          name='priceRange'
          min={100}
          max={20000}
          step={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>RS.100</span>
          <span>RS.{priceRange[1]}</span>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar
