import React from 'react'
import { Link } from 'react-router-dom';

const Maylike = ({products, loading, error}) => {
  if(loading){
    return <p>Loading ...</p>
  }
  if(error){
    return <p>Error: {error}</p>
  }
  return (
    <div className='grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className='block'>
        <div className='bg-white p-4 rounded-lg'>
          <div className='mb-4 w-full h-96'>
            <img 
              src={product.images[0].url}
              alt="happy"
              className='w-full h-full object-cover rounded-lg'
            />           
          </div>
          <div>
            <h3 className='text-sm mb-2'>{product.name}</h3>
            <p className='text-gray-500 text-sm font-medium tracking-tighter'>{product.price}</p>
          </div>
        </div>
        </Link>
      ))}

    </div>
  );
};

export default Maylike
