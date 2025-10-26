// import React from 'react'
// import { RiDeleteBinLine } from "react-icons/ri";
// import { useDispatch } from 'react-redux';
// import { updateCartItemQuantity, removeFromCart } from '../../redux/slices/cartSlice';


// const CartContent = ({ cart, userId, guestId}) => {
//     const dispatch = useDispatch();

//     //handle adding or subtracting to cart
//     const handleAddToCart=(productId, delta, quantity, size, color)=>{
//         const newQuantity= quantity+delta;
//         if(newQuantity>=1){
//             dispatch(
//                 updateCartItemQuantity({
//                     productId,
//                     quantity: newQuantity,
//                     guestId,
//                     userId,
//                     size,
//                     color,
//                 })
//             );
//         }
//     };

//     const handleRemoveFromCart=(productId, size, color)=>{
//             dispatch(
//                 removeFromCart({
//                     productId,
//                     guestId,
//                     userId,
//                     size,
//                     color,
//                 })
//             );
//     };


//   return (
//   <div>
//     {
//     cart.products.map((product, index) => (
//         <div key={index} className='flex items-start justify-between py-4 border-b'>

//             <div className='flex items-start'>
//                 <img 
//                     src={product.image} 
//                     alt={product.name} 
//                     className='w-20 h-24 object-cover  mr-4 rounded' 
//                 />
//                 <div>
//                     <h3 className='text-lg font-semibold'>{product.name}</h3>
//                     <p className='text-sm text-gray-600'>Size: {product.size} | Color: {product.color}</p>
//                     <div className='flrx items-center mt-2'>
//                         <button 
//                             className='border rounded px-2 py-1 text-xl font-medium' 
//                             onClick={()=>handleAddToCart(
//                             product.productId,
//                             -1,
//                             product.quantity,
//                             product.size,
//                             product.color,
//                         )}
//                         >-</button>
//                         <span className='px-2'>{product.quantity}</span>
//                         <button 
//                             className='border rounded px-2 py-1 text-xl font-medium' 
//                             onClick={()=>handleAddToCart(
//                             product.productId,
//                             1,
//                             product.quantity,
//                             product.size,
//                             product.color,
//                         )}
//                         >+</button>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <p className='text-lg font-semibold'>{product.price}</p>
//                 <button 
//                     className='text-sm text-red-600 hover:underline mt-2'
//                     onClick={()=>handleRemoveFromCart(product.productId, product.size, product.color)}
//                 >
//                     <RiDeleteBinLine className='h-8 w-8' />
//             </button>
//             </div>
//         </div>
//     ))}
//   </div>
//     );
// };

// export default CartContent

import React, { useEffect, useState } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeFromCart } from '../../redux/slices/cartSlice';

const CartContent = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch();
    const [userCountry, setUserCountry] = useState(null);

    // Detect user country
    useEffect(() => {
        const fetchUserCountry = async () => {
            try {
                const res = await fetch('https://api.country.is/');
                const data = await res.json();
                setUserCountry(data.country); // e.g., "NP", "IN", "US"
            } catch (err) {
                console.error('Failed to detect country:', err);
                setUserCountry('OTHER');
            }
        };
        fetchUserCountry();
    }, []);

    // Convert price based on country
    const getLocalizedPrice = (price) => {
        if (!price) return '';

        let convertedPrice = price;
        let currency = 'USD';

        if (userCountry === 'NP') {
            currency = 'NPR';
            convertedPrice = price;
        } else if (userCountry === 'IN') {
            currency = 'INR';
            convertedPrice = price * 0.625; // example conversion rate
        } else {
            currency = 'USD';
            convertedPrice = price * 0.0075; // example conversion rate
        }

        return new Intl.NumberFormat('en', {
            style: 'currency',
            currency,
            maximumFractionDigits: 2,
        }).format(convertedPrice);
    };

    // handle adding or subtracting quantity
    const handleAddToCart = (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            dispatch(
                updateCartItemQuantity({
                    productId,
                    quantity: newQuantity,
                    guestId,
                    userId,
                    size,
                    color,
                })
            );
        }
    };

    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(
            removeFromCart({
                productId,
                guestId,
                userId,
                size,
                color,
            })
        );
    };

    return (
        <div>
            {cart.products.map((product, index) => (
                <div key={index} className='flex items-start justify-between py-4 border-b'>
                    <div className='flex items-start'>
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className='w-20 h-24 object-cover mr-4 rounded' 
                        />
                        <div>
                            <h3 className='text-lg font-semibold'>{product.name}</h3>
                            <p className='text-sm text-gray-600'>Size: {product.size} | Color: {product.color}</p>
                            <div className='flex items-center mt-2'>
                                <button 
                                    className='border rounded px-2 py-1 text-xl font-medium' 
                                    onClick={() => handleAddToCart(
                                        product.productId,
                                        -1,
                                        product.quantity,
                                        product.size,
                                        product.color,
                                    )}
                                >-</button>
                                <span className='px-2'>{product.quantity}</span>
                                <button 
                                    className='border rounded px-2 py-1 text-xl font-medium' 
                                    onClick={() => handleAddToCart(
                                        product.productId,
                                        1,
                                        product.quantity,
                                        product.size,
                                        product.color,
                                    )}
                                >+</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>
                            {userCountry ? getLocalizedPrice(product.price) : '...'}
                        </p>
                        <button 
                            className='text-sm text-red-600 hover:underline mt-2 ml-9'
                            onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}
                        >
                            <RiDeleteBinLine className=' h-8 w-8' />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartContent;
