
// import { FiChevronLeft } from "react-icons/fi";
// import { FiChevronRight } from "react-icons/fi";
// import { Link } from 'react-router-dom';
// import { useRef, useState } from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';

// const API_URL= `${process.env.REACT_APP_BACKEND_URL}`

// const NewArrivals = () => {

//     const scrollRef = useRef(null);
//     const [isDragging, setIsDragging] = useState(false);
//     const [startX, setStartX] = useState(0);
//     const [scrollLeft, setScrollLeft] = useState(false);
//     const [canScrollLeft, setCanScrollLeft] = useState(false);
//     const [canScrollRight, setCanScrollRight] = useState(true);

//    const[newArrivals, setNewArrivals]=useState([]);
//    useEffect(()=>{
//     const fetchNewArrivals=async()=>{
//         try {
//             const response = await axios.get(`${API_URL}/api/products/new-arrivals`);
//             setNewArrivals(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     fetchNewArrivals();
//    }, []);

//     // Mouse Events for Dragging
//     const handleMouseDown = (e) => {
//         setIsDragging(true);
//         setStartX(e.pageX - scrollRef.current.offsetLeft);
//         setScrollLeft(scrollRef.current.scrollLeft);
//     };

//     const handleMouseUporLeave = () => {
//         setIsDragging(false);
//     };
//     const handleMouseMove = (e) => {
//         if(!isDragging) return;
//         e.preventDefault();
//         const x = e.pageX - scrollRef.current.offsetLeft;
//         const walk = (x - startX) * 1; //scroll-fast
//         scrollRef.current.scrollLeft = scrollLeft - walk;
//     }



//     // scroll Function For Button
//     const scroll = (direction) => {
//         const scrollAmount = direction === 'left' ? -360 : 360;
//         scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     };


//     // update scroll buttons
//     const updateScrollButtons = () => {
//         const container = scrollRef.current;

//         if(container) {
//             const leftScroll = container.scrollLeft;
//             const rightScrollable = container.scrollWidth > container.clientWidth + leftScroll;

//             setCanScrollLeft(leftScroll > 0);
//             setCanScrollRight(rightScrollable);
//         }
//         console.log({
//             scrollLeft: container.scrollLeft,
//             clientWidth: container.clientWidth,
//             containerScrollWidth: container.scrollWidth,
//         });
//     };


//     useEffect(() => { 
//             const container = scrollRef.current;
//             if(container) {
//                 container.addEventListener('scroll', updateScrollButtons);
//                 updateScrollButtons();
//                 return () => {
//                     container.removeEventListener('scroll', updateScrollButtons);
//                 };
//             }
//         },[newArrivals]);



//   return (
//     <div>
//         <section className='py-16 px-4 lg:px-0'>
//             <div className='container mx-auto text-center mb-10 relative'>
//                 <h2 className='text-3xl font-bold mb-8 text-center'>New Arrivals</h2>
//                 <p className='text-lg text-gray-600 mb-8'>
//                     Check out the latest additions to our collection! Discover the latest styles from the runway.
//                 </p>


//                 {/* scroll Button */}
//                 <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
//                     <button 
//                         onClick={() => scroll('left')}
//                         disabled={!canScrollLeft}
//                         className={`p-2 rounded border ${!canScrollLeft ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}`}>

//                         <FiChevronLeft className='text-2xl h-6 w-6' />
//                     </button>
//                     <button 
//                         onClick={() => scroll('right')}
//                         disabled={!canScrollRight}
//                         className={`p-2 rounded border ${!canScrollRight ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}`}>
//                         <FiChevronRight className='text-2xl h-6 w-6' />
//                     </button>
//                 </div>
//             </div>


//             {/* Scrollable Content */}
//             <div 
//                 ref={scrollRef}
//                 className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//                 onMouseDown={handleMouseDown}
//                 onMouseUp={handleMouseUporLeave}
//                 onMouseMove={handleMouseMove}
//                 onMouseLeave={handleMouseUporLeave}
//                 >
//                 {newArrivals.map((item) => (
//                     <div 
//                         key={item._id} 
//                         className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative '>
//                             <Link to={`/product/${item._id}`} className='block'>
//                             <img 
//                                 src={item.images[0]?.url} 
//                                 alt={item.images[0]?.altText}
//                                 className='w-full h-[500px] object-cover rounded-lg'
//                                 draggable={false}
//                             />
//                             </Link>
//                             <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md  text-white p-4 rounded-b-lg'>
//                                 <Link to={`/product/${item._id}`} className='block'>
//                                     <h3 className='font-medium '>{item.name}</h3>
//                                     <p className='mt-1'>Rs {item.price}</p>
//                                 </Link>
//                             </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     </div>
//   );
// };

// export default NewArrivals


import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}`;

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [newArrivals, setNewArrivals] = useState([]);
  const [userCountry, setUserCountry] = useState(null);

  // Fetch new arrivals
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products/new-arrivals`);
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  // Detect user country
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

  // Format price based on country
  const getLocalizedPrice = (price) => {
    if (!price) return '';
    let convertedPrice = price;
    let currency = 'USD';

    if (userCountry === 'NP') {
      currency = 'NPR';
      convertedPrice = price;
    } else if (userCountry === 'IN') {
      currency = 'INR';
      convertedPrice = price * 0.625;
    } else {
      currency = 'USD';
      convertedPrice = price * 0.0075;
    }

    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUporLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Scroll buttons
  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -360 : 360;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth > container.clientWidth + leftScroll;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => {
        container.removeEventListener('scroll', updateScrollButtons);
      };
    }
  }, [newArrivals]);

  if (!newArrivals || newArrivals.length === 0) return <p>No new arrivals found.</p>;

  return (
    <div>
      <section className="py-16 px-4 lg:px-0">
        <div className="container mx-auto text-center mb-10 relative">
          <h2 className="text-3xl font-bold mb-8 text-center">New Arrivals</h2>
          <p className="text-lg text-gray-600 mb-8">
            Check out the latest additions to our collection! Discover the latest styles from the runway.
          </p>

          {/* scroll Buttons */}
          <div className="absolute right-0 bottom-[-30px] flex space-x-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2 rounded border ${!canScrollLeft ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}`}
            >
              <FiChevronLeft className="text-2xl h-6 w-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-2 rounded border ${!canScrollRight ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}`}
            >
              <FiChevronRight className="text-2xl h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUporLeave}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUporLeave}
        >
          {newArrivals.map((item) => (
            <div key={item._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
              <Link to={`/product/${item._id}`} className="block">
                <img
                  src={item.images[0]?.url}
                  alt={item.images[0]?.altText || item.name}
                  className="w-full h-[500px] object-cover rounded-lg"
                  draggable={false}
                />
              </Link>
              <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                <Link to={`/product/${item._id}`} className="block">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="mt-1">{userCountry ? getLocalizedPrice(item.price) : '...'}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewArrivals;
