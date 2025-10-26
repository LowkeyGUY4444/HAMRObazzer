// import React from 'react'
// import { TbBrandMeta } from "react-icons/tb";
// import { IoLogoInstagram } from "react-icons/io";
// import { RiTwitterXLine } from "react-icons/ri";


// const TopBar = () => {
//   return <div className='bg-TopBar-red text-white'>
//       <div className='container mx-auto flex items-center justify-between py-3'>
//         <div className='hidden md:flex items-center space-x-4'>
//             <a href='#' className='hover:text-gary-300'>
//                  <TbBrandMeta className='h-6 w-6' />
//             </a>
//             <a href='#' className='hover:text-gary-300'>
//                  <IoLogoInstagram  className='h-6 w-6' />
//             </a>
//             <a href='#' className='hover:text-gary-300'>
//                  <RiTwitterXLine  className='h-6 w-6' />
//             </a>
//         </div>
//         <div className='text-sm text-center flex-grow'>
//             <span>Super Deal! Free Shipping on Orders Over Rs.500</span>
//         </div>
//         <div className='text-sm hidden md:block'>
//             <a href='tel:+97 9848820267' className='hover:text-gary-300'>+97 9848820267</a>
//         </div>
//       </div>
//     </div>
    
  
// }

// export default TopBar

import React, { useEffect, useState } from 'react';
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const TopBar = () => {
  const [thresholdText, setThresholdText] = useState("Rs.500");

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
            text = "$ 5";
          }
          setThresholdText(text);
        }
      } catch (err) {
        console.error("Error fetching country:", err);
        setThresholdText("Rs.500"); // fallback
      }
    };
    fetchCountry();
  }, []);

  return (
    <div className='bg-TopBar-red text-white'>
      <div className='container mx-auto flex items-center justify-between py-3'>
        
        {/* Social Icons */}
        <div className='hidden md:flex items-center space-x-4'>
          <a href='#' className='hover:text-gray-300'>
            <TbBrandMeta className='h-6 w-6' />
          </a>
          <a href='#' className='hover:text-gray-300'>
            <IoLogoInstagram className='h-6 w-6' />
          </a>
          <a href='#' className='hover:text-gray-300'>
            <RiTwitterXLine className='h-6 w-6' />
          </a>
        </div>

        {/* Center text */}
        <div className='text-sm text-center flex-grow'>
          <span>
            Super Deal! Free Shipping on Orders Over {thresholdText}
          </span>
        </div>

        {/* Contact info */}
        <div className='text-sm hidden md:block'>
          <a href='tel:+979848820267' className='hover:text-gray-300'>+97 9848820267</a>
        </div>

      </div>
    </div>
  );
};

export default TopBar;
