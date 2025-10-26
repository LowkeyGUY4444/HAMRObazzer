// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import { toast } from 'sonner';
// import Maylike from './MayLike';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productsSlice';
// import { addToCart } from '../../redux/slices/cartSlice';
// import { useParams } from 'react-router-dom';



// const ProductDetails = ({productId}) => {
//     const {id}= useParams();
//     const dispatch= useDispatch();
//     const{selectedProduct, loading, error, similarProducts}= useSelector(
//         (state)=>state.products
//     );
//     const{user, guestId}= useSelector((state)=>state.auth)
//     // const [mainImage, setMainImage] = useState(selectedProduct.images[0]);
//      const [mainImage, setMainImage] = useState(null);
//     // for compulsary to add a item in cart
//     const [quantity, setQuantity] = useState(1);
//     const [selectedSize, setSelectedSize] = useState(null);
//     const [selectedColor, setSelectedColor] = useState(null);
//     const [isButtonDisabled, setIsButtonDisabled] = useState(false);
 
//     const productFetchId= productId || id;
//     useEffect(()=>{
//         if(productFetchId){
//             dispatch(fetchProductDetails(productFetchId));
//             dispatch(fetchSimilarProducts({id: productFetchId}))
//             // dispatch(fetchSimilarProducts(productFetchId)); // ✅ fixed
//             //dispatch(fetchSimilarProducts(product._id))
//         }
//     },[dispatch, productFetchId]);

//     useEffect(() => {
//         if (selectedProduct?.images?.length > 0) {
//             setMainImage(selectedProduct.images[0].url);
//         }
//     }, [selectedProduct]);


//     // Tost Duration logic
//     const handleAddToCart = () => {
//         if (!selectedSize || !selectedColor) {
//             toast.error('Please select size and color before addind to cart.', {duration: 1000,} ) ;
//             return;
                  
//         }
//         setIsButtonDisabled(true);
        
//         dispatch(
//             addToCart({
//                 productId: productFetchId,
//                 quantity,
//                 size: selectedSize,
//                 color: selectedColor,
//                 guestId,
//                 userId: user?._id,
//             })
//         )
//         .then(()=>{
//             toast.success("Product added to cart!",{duration: 1000});
//         })
//         .finally(()=>{
//             setIsButtonDisabled(false);
//         })
//     };

//     if(loading){
//         return <p>Loadung ...</p>
//     }
//     if(error){
//         return <p>Error: {error}</p>
//     }


//   return (
//     <div className='p-6'>
//         {selectedProduct &&(
//         <div className='max-w-6xl mx-auto bg-white rounded-lg'>
//             <div className='flex flex-col md:flex-row'>
//                 {/* Left Thumbnail */}
//                 <div className='hidden md:flex flex-col space-y-4 mr-6'>
//                     {selectedProduct.images.map((image, index) => (
//                         <img 
//                             key={index}
//                             src={image.url}
//                             alt={image.altText || `Thumbnail ${index}`}
//                             className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? 'border-black' : 'border-transparent'} `}
//                             onClick={() => setMainImage(image.url)}
//                         />

//                     ))}
//                 </div>
//                 {/* Main Image */}
//                 <div className='md:w-1/2'>
//                     <div className='mb-4'>
//                         <img 
//                             src={mainImage}
//                             //src={selectedProduct.images[0]?.url}
//                             alt="main Product"
//                             className='w-full h-auto object-cover rounded-lg'
//                         />
//                     </div>
//                 </div>
//                 {/* Mobile Thumbnail the to image will come in bottom of main image */}
//                 <div className='md:hidden flex flex-row space-y-4'>
//                     {selectedProduct.images.map((image, index) => (
//                         <img 
//                             key={index}
//                             src={image.url}
//                             alt={image.altText || `Thumbnail ${index}`}
//                             className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? 'border-black' : 'border-transparent'} `}
//                             onClick={() => setMainImage(image.url)}
//                         />

//                     ))}
//                 </div>
//                 {/* Product Info */}
//                 <div className='md:w-1/2 md:ml-10'>
//                     <h1 className='text-2xl md:text-3xl font-bold mb-2'>{selectedProduct.name}</h1>
//                     <p className='text-2xl text-gray-600 mb-1 line-through'>{selectedProduct.price }</p>
//                     <p className='text-3xl font-semibold mb-2'>{selectedProduct.discountPrice}
//                          <span className='text-green-600 text-lg'>({Math.round(((selectedProduct.price - selectedProduct.discountPrice) / selectedProduct.price) * 100)}%)</span>
//                     </p>
//                     <p className='text-gray-600 mb-4'>{selectedProduct.description}</p>

//                     {/* for color icons */}
//                     <div>
//                         <div className='mb-4'>
//                             <p className='text-gray-700'>Color:</p>
//                             <div className='flex gap-2 mt-2'>
//                                 {selectedProduct.colors.map((color) => (
//                                     <button 
//                                         key={color}
//                                         className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
//                                         onClick={() => setSelectedColor(color)}
//                                         style={{
//                                             backgroundColor: color.toLowerCase(),
//                                             filter: 'brightness(0.8)'
//                                         }}>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                         {/* ✅ Brand Display Below Color */}
//                         {selectedProduct.brand && (
//                             <div className='mb-4'>
//                             <p className='text-gray-700'>
//                                 <span className='font-semibold'>Brand:</span> {selectedProduct.brand}
//                             </p>
//                             </div>
//                         )}
//                         {/* for size */}
//                         <div className='mb-4'>
//                             <p className='text-gray-700'>Size:</p> 
//                             <div className='flex gap-2 mt-2'>
//                                 {selectedProduct.sizes.map((size) => (
//                                     <button 
//                                         key={size}
//                                         className={`px-4 py-2 border rounded  ${selectedSize === size ? 'bg-black text-white' : ''}`}
//                                         onClick={() => setSelectedSize(size)}>
//                                         {size}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                         {/* For Quantity */}
//                         <div className='mb-4'>
//                             <p className='text-gray-700'>Quantity:</p>
//                             <button className='px-2 py-1 border rounded bg-gray-200 text-lg' onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
//                             <span className='px-4 py-2 border rounded'>{quantity}</span>
//                             <button className='px-2 py-1 border rounded bg-gray-200 text-lg' onClick={() => setQuantity(prev => Math.min(50, prev + 1))}>+</button>
//                         </div>
//                         {/* Add to Cart Button */}
//                         <div className='mb-4'>
//                             <button 
//                                 disabled={isButtonDisabled}
//                                 onClick={handleAddToCart} 
//                                 className={`w-full bg-black text-white py-3 rounded-lg mb-4 ${isButtonDisabled ? 'cursor-not-allowed' : 'hover:bg-gray-900'}`}
//                             >
//                                 {isButtonDisabled ? 'Adding...' : "Add to Cart"}
//                             </button>
//                         </div>
//                     </div>
//                 </div> 
//             </div>

//             {/* for You May Like section */}
//             <div className='mt-20'>
//                 <h2 className='text-2xl font-bold mb-4 text-center'>You May Also Like</h2>
//                 <Maylike  products={similarProducts} loading={loading} error={error} />

//             </div>
//         </div>
//         )}
//     </div>
//   );
// };

// export default ProductDetails



// import React, { useEffect, useState } from 'react';
// import { toast } from 'sonner';
// import Maylike from './MayLike';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productsSlice';
// import { addToCart } from '../../redux/slices/cartSlice';
// import { useParams } from 'react-router-dom';

// const ProductDetails = ({ productId }) => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
//   const { user, guestId } = useSelector((state) => state.auth);

//   const [mainImage, setMainImage] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [userCountry, setUserCountry] = useState(null);

//   const productFetchId = productId || id;
// //it will help to fetch the contry.................
//   useEffect(() => {
//     const fetchUserCountry = async () => {
//       try {
//         const res = await fetch('https://ipapi.co/json');
//         const data = await res.json();
//         setUserCountry(data.country_code);
//       } catch (err) {
//         console.error('Failed to detect country:', err);
//         setUserCountry('OTHER');
//       }
//     };
//     fetchUserCountry();
//   }, []);

//   useEffect(() => {
//     if (productFetchId) {
//       dispatch(fetchProductDetails(productFetchId));
//       dispatch(fetchSimilarProducts({ id: productFetchId }));
//     }
//   }, [dispatch, productFetchId]);

//   useEffect(() => {
//     if (selectedProduct?.images?.length > 0) {
//       setMainImage(selectedProduct.images[0].url);
//     }
//   }, [selectedProduct]);
// //help to convert the price in the native currency
//   const getLocalizedPrice = (price) => {
//     let convertedPrice = price;
//     let currency = 'USD';

//     if (userCountry === 'NP') {
//       currency = 'NPR';
//       convertedPrice = price;
//     } else if (userCountry === 'IN') {
//       currency = 'INR';
//       convertedPrice = price * 0.625;
//     } else {
//       currency = 'USD';
//       convertedPrice = price * 0.0075;
//     }

//     return new Intl.NumberFormat('en', {
//       style: 'currency',
//       currency,
//       maximumFractionDigits: 2,
//     }).format(convertedPrice);
//   };

//   const handleAddToCart = () => {
//     if (!selectedSize || !selectedColor) {
//       toast.error('Please select size and color before adding to cart.', { duration: 1000 });
//       return;
//     }

//     setIsButtonDisabled(true);

//     dispatch(
//       addToCart({
//         productId: productFetchId,
//         quantity,
//         size: selectedSize,
//         color: selectedColor,
//         guestId,
//         userId: user?._id,
//       })
//     )
//       .then(() => {
//         toast.success('Product added to cart!', { duration: 1000 });
//       })
//       .finally(() => {
//         setIsButtonDisabled(false);
//       });
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="p-6">
//       {selectedProduct && (
//         <div className="max-w-6xl mx-auto bg-white rounded-lg">
//           <div className="flex flex-col md:flex-row">
//             <div className="hidden md:flex flex-col space-y-4 mr-6">
//               {selectedProduct.images.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image.url}
//                   alt={image.altText || `Thumbnail ${index}`}
//                   className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
//                     mainImage === image.url ? 'border-black' : 'border-transparent'
//                   }`}
//                   onClick={() => setMainImage(image.url)}
//                 />
//               ))}
//             </div>

//             <div className="md:w-1/2">
//               <div className="mb-4">
//                 <img src={mainImage} alt="main Product" className="w-full h-auto object-cover rounded-lg" />
//               </div>
//             </div>

//             <div className="md:hidden flex flex-row space-y-4">
//               {selectedProduct.images.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image.url}
//                   alt={image.altText || `Thumbnail ${index}`}
//                   className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
//                     mainImage === image.url ? 'border-black' : 'border-transparent'
//                   }`}
//                   onClick={() => setMainImage(image.url)}
//                 />
//               ))}
//             </div>

//             <div className="md:w-1/2 md:ml-10">
//               <h1 className="text-2xl md:text-3xl font-bold mb-2">{selectedProduct.name}</h1>

//               <p className="text-2xl text-gray-600 mb-1 line-through">
//                 {getLocalizedPrice(selectedProduct.price)}
//               </p>

//               <p className="text-3xl font-semibold mb-2">
//                 {getLocalizedPrice(selectedProduct.discountPrice)}
//                 <span className="text-green-600 text-lg">
//                   ({Math.round(((selectedProduct.price - selectedProduct.discountPrice) / selectedProduct.price) * 100)}%)
//                 </span>
//               </p>

//               <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

//               <div className="mb-4">
//                 <p className="text-gray-700">Color:</p>
//                 <div className="flex gap-2 mt-2">
//                   {selectedProduct.colors.map((color) => (
//                     <button
//                       key={color}
//                       className={`w-8 h-8 rounded-full border ${
//                         selectedColor === color ? 'border-black' : 'border-gray-300'
//                       }`}
//                       onClick={() => setSelectedColor(color)}
//                       style={{ backgroundColor: color.toLowerCase(), filter: 'brightness(0.8)' }}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {selectedProduct.brand && (
//                 <div className="mb-4">
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Brand:</span> {selectedProduct.brand}
//                   </p>
//                 </div>
//               )}

//               <div className="mb-4">
//                 <p className="text-gray-700">Size:</p>
//                 <div className="flex gap-2 mt-2">
//                   {selectedProduct.sizes.map((size) => (
//                     <button
//                       key={size}
//                       className={`px-4 py-2 border rounded ${selectedSize === size ? 'bg-black text-white' : ''}`}
//                       onClick={() => setSelectedSize(size)}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <p className="text-gray-700">Quantity:</p>
//                 <button
//                   className="px-2 py-1 border rounded bg-gray-200 text-lg"
//                   onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//                 >
//                   -
//                 </button>
//                 <span className="px-4 py-2 border rounded">{quantity}</span>
//                 <button
//                   className="px-2 py-1 border rounded bg-gray-200 text-lg"
//                   onClick={() => setQuantity((prev) => Math.min(50, prev + 1))}
//                 >
//                   +
//                 </button>
//               </div>

//               <div className="mb-4">
//                 <button
//                   disabled={isButtonDisabled}
//                   onClick={handleAddToCart}
//                   className={`w-full bg-black text-white py-3 rounded-lg mb-4 ${
//                     isButtonDisabled ? 'cursor-not-allowed' : 'hover:bg-gray-900'
//                   }`}
//                 >
//                   {isButtonDisabled ? 'Adding...' : 'Add to Cart'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;




import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Maylike from './MayLike';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [userCountry, setUserCountry] = useState(null);

  const productFetchId = productId || id;

  // Detect user country using IP
  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json');
        const data = await res.json();
        setUserCountry(data.country_code); // e.g., "NP", "IN", "US"
      } catch (err) {
        console.error('Failed to detect country:', err);
        setUserCountry('OTHER');
      }
    };
    fetchUserCountry();
  }, []);

  // Fetch product details
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  // Set main image
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  // Currency conversion based on country
  const getLocalizedPrice = (price) => {
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

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color before adding to cart.', { duration: 1000 });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success('Product added to cart!', { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? 'border-black' : 'border-transparent'
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img src={mainImage} alt="main Product" className="w-full h-auto object-cover rounded-lg" />
              </div>
            </div>

            {/* Mobile Thumbnails */}
            <div className="md:hidden flex flex-row space-y-4">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? 'border-black' : 'border-transparent'
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{selectedProduct.name}</h1>

              {/* Price */}
              <p className="text-2xl text-gray-600 mb-1 line-through">
                {userCountry ? getLocalizedPrice(selectedProduct.price) : '...'}
              </p>

              <p className="text-3xl font-semibold mb-2">
                {userCountry ? getLocalizedPrice(selectedProduct.discountPrice) : '...'}
                {userCountry && (
                  <span className="text-green-600 text-lg">
                    ({Math.round(((selectedProduct.price - selectedProduct.discountPrice) / selectedProduct.price) * 100)}%)
                  </span>
                )}
              </p>

              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

              {/* Color */}
              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color ? 'border-black' : 'border-gray-300'
                      }`}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.toLowerCase(), filter: 'brightness(0.8)' }}
                    />
                  ))}
                </div>
              </div>

              {/* Brand */}
              {selectedProduct.brand && (
                <div className="mb-4">
                  <p className="text-gray-700">
                    <span className="font-semibold">Brand:</span> {selectedProduct.brand}
                  </p>
                </div>
              )}

              {/* Size */}
              <div className="mb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded ${selectedSize === size ? 'bg-black text-white' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <p className="text-gray-700">Quantity:</p>
                <button
                  className="px-2 py-1 border rounded bg-gray-200 text-lg"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2 border rounded">{quantity}</span>
                <button
                  className="px-2 py-1 border rounded bg-gray-200 text-lg"
                  onClick={() => setQuantity((prev) => Math.min(50, prev + 1))}
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <div className="mb-4">
                <button
                  disabled={isButtonDisabled}
                  onClick={handleAddToCart}
                  className={`w-full bg-black text-white py-3 rounded-lg mb-4 ${
                    isButtonDisabled ? 'cursor-not-allowed' : 'hover:bg-gray-900'
                  }`}
                >
                  {isButtonDisabled ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
