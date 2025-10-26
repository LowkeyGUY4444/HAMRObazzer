// import React from 'react'
// import { HiShoppingBag, HiArrowPathRoundedSquare, HiOutlineCreditCard } from "react-icons/hi2";




// const FeatureSection = () => {
//   return (
//     <section className='py-16 px-4 bg-white'>
//         <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 text-center'>
//             {/* Feature 1 */}
//             <div className='flex flex-col items-center'>
//                 <div className='p-4 rounded-full mb-4'>
//                     <HiShoppingBag className='text-xl' />
//                 </div>
//                 <h2 className='tracking-tighter mb-2 uppercase'>Free Shipping</h2>
//                 <p className='text-gray-600 text-sm tracking-tighter'>On all orders over Rs.500</p>
//             </div>
//             {/* Feature 2 */}
//             <div className='flex flex-col items-center'>
//                 <div className='p-4 rounded-full mb-4'>
//                     <HiArrowPathRoundedSquare className='text-xl' />
//                 </div>
//                 <h2 className='tracking-tighter mb-2 uppercase'>45 days return</h2>
//                 <p className='text-gray-600 text-sm tracking-tighter'>Mony back gurantee</p>
//             </div>
//             {/* Feature 3 */}
//             <div className='flex flex-col items-center'>
//                 <div className='p-4 rounded-full mb-4'>
//                     <HiOutlineCreditCard className='text-xl' />
//                 </div>
//                 <h2 className='tracking-tighter mb-2 uppercase'>Secure checkout</h2>
//                 <p className='text-gray-600 text-sm tracking-tighter'>100% secure checkout process</p>
//             </div>
//         </div>
//     </section>
//   );
// };

// export default FeatureSection

import React, { useEffect, useState } from 'react';
import { HiShoppingBag, HiArrowPathRoundedSquare, HiOutlineCreditCard } from "react-icons/hi2";

const FeatureSection = () => {
  const [shippingText, setShippingText] = useState("Rs.500");

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch('https://ipwhois.app/json/');
        const data = await res.json();

        if (data && data.country) {
          let text = "Rs 500"; // default Nepal
          if (data.country === "India") {
            text = "₹350";
          } else if (data.country !== "Nepal") {
            text = "$5";
          }
          setShippingText(text);
        }
      } catch (err) {
        console.error("Error fetching country:", err);
        setShippingText("Rs.500"); // fallback
      }
    };
    fetchCountry();
  }, []);

  return (
    <section className='py-16 px-4 bg-white'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 text-center'>
        
        {/* Feature 1 */}
        <div className='flex flex-col items-center'>
          <div className='p-4 rounded-full mb-4'>
            <HiShoppingBag className='text-xl' />
          </div>
          <h2 className='tracking-tighter mb-2 uppercase'>Free Shipping</h2>
          <p className='text-gray-600 text-sm tracking-tighter'>
            On all orders over {shippingText}
          </p>
        </div>

        {/* Feature 2 */}
        <div className='flex flex-col items-center'>
          <div className='p-4 rounded-full mb-4'>
            <HiArrowPathRoundedSquare className='text-xl' />
          </div>
          <h2 className='tracking-tighter mb-2 uppercase'>45 days return</h2>
          <p className='text-gray-600 text-sm tracking-tighter'>Money back guarantee</p>
        </div>

        {/* Feature 3 */}
        <div className='flex flex-col items-center'>
          <div className='p-4 rounded-full mb-4'>
            <HiOutlineCreditCard className='text-xl' />
          </div>
          <h2 className='tracking-tighter mb-2 uppercase'>Secure checkout</h2>
          <p className='text-gray-600 text-sm tracking-tighter'>100% secure checkout process</p>
        </div>

      </div>
    </section>
  );
};

export default FeatureSection;
