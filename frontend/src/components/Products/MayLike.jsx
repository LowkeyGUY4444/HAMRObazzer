// import React from 'react'
// import { Link } from 'react-router-dom';

// const Maylike = ({products, loading, error}) => {
//   if(loading){
//     return <p>Loading ...</p>
//   }
//   if(error){
//     return <p>Error: {error}</p>
//   }
//   return (
//     <div className='grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
//       {products.map((product, index) => (
//         <Link key={index} to={`/product/${product._id}`} className='block'>
//         <div className='bg-white p-4 rounded-lg'>
//           <div className='mb-4 w-full h-96'>
//             <img 
//               src={product.images[0].url}
//               alt="happy"
//               className='w-full h-full object-cover rounded-lg'
//             />           
//           </div>
//           <div>
//             <h3 className='text-sm mb-2'>{product.name}</h3>
//             <p className='text-gray-500 text-sm font-medium tracking-tighter'>{product.price}</p>
//           </div>
//         </div>
//         </Link>
//       ))}

//     </div>
//   );
// };

// export default Maylike

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Maylike = ({ products, loading, error }) => {
  const [userCountry, setUserCountry] = useState(null);

  // Detect user country using ipwhois.app
  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const res = await fetch('https://ipwhois.app/json/');
        const data = await res.json();
        if (data && data.country_code) {
          setUserCountry(data.country_code); // e.g., "NP", "IN", "US"
        }
      } catch (err) {
        console.error('Failed to detect country:', err);
        setUserCountry('OTHER');
      }
    };
    fetchUserCountry();
  }, []);

  // Function to format price based on country
  const getLocalizedPrice = (price) => {
    if (!price) return '';
    let convertedPrice = price;
    let currency = 'USD';

    if (userCountry === 'NP') {
      currency = 'NPR';
      convertedPrice = price; // Stored in NPR
    } else if (userCountry === 'IN') {
      currency = 'INR';
      convertedPrice = price * 0.625; // Convert NPR to INR
    } else {
      currency = 'USD';
      convertedPrice = price * 0.0075; // Convert NPR to USD
    }

    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="bg-white p-4 rounded-lg">
            <div className="mb-4 w-full h-96">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-sm mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm font-medium tracking-tighter">
                {userCountry ? getLocalizedPrice(product.price) : '...'}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Maylike;
