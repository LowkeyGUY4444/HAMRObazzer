// import { useEffect } from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {useNavigate} from "react-router-dom";
// import { clearCart } from '../redux/slices/cartSlice';

// const OrderConfirmation = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { checkout } = useSelector((state)=> state.checkout);
//     //clear the cart wene the order is conformed!!!!!!!!!!!
//     useEffect(()=>{
//         if(checkout && checkout._id){
//             dispatch(clearCart());
//             localStorage.removeItem("cart");
//         }else{
//             navigate("/my-orders");
//         }
//     },[checkout, dispatch, navigate])

//     const calculateAssecptedDelivery = (createdAt) => {
//         const orderDate = new Date(createdAt);
//         orderDate.setDate(orderDate.getDate() + 7);
//         return orderDate;
//     };


//   return (
//     <div className='max-w-4xl mx-auto py-6 bg-white'>
//       <h1 className='text-4xl font-bold text-center mb-8 text-emerald-700'>Thank You for Your Order!</h1>

//       {checkout && (
//         <div className='p-6 rounded-lg shadow border'>
//             <div className='flex justify-between mb-20'>
//                 {/* Order Id and Date */}
//                 <div className=''>
//                     <h2 className='text-xl font-semibold'>Order Id: #{checkout._id}</h2>
//                     <p className='text-gray-500'>Order date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
//                 </div>
//                 <div>
//                     <p className='text-emerald-700 text-sm'>
//                         Expected Delivery:{" "}
//                         {calculateAssecptedDelivery(checkout.createdAt).toLocaleDateString()}
//                     </p>
//                 </div>
//             </div>
//             {/* Ordered item */}
//             <div className='mb-20 '>
//             {checkout.checkoutItems.map((item) =>(
//                 <div key={item.productId} className='flex items-center mb-4'>
//                     <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover mr-4 rounser-mb"
//                      />
//                      <div>
//                         <h4 className='text-md font-semibold '>{item.name}</h4>
//                         <p className='text-gray-500 text-sm'>{item.color} | {item.size}</p>
                         
//                      </div>
//                      <div className='ml-auto text-right'>
//                         <p className='text-md'>RS.{item.price?.toLocaleString()}</p>
//                         <p className='text-gray-500 text-sm'>Qty: {item.quantity}</p>
                        
//                      </div>
//                 </div>
//             ))}

//             </div>

//             {/* Payment and Delivery INFO */}
//             <div className='grid grid-cols-2 gap-20'>
//                 <div>
//                     <h4 className='text-lg font-semibold mb-2'>Payment</h4>
//                     <p className='text-gray-600'>Cash on Delivery</p>
//                 </div>
//                 <div>
//                     <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
//                     <p className='text-gray-600'>
//                         {checkout.shippingAddress.address}

//                     </p>
//                     <p className='text-gray-600'>
//                         {checkout.shippingAddress.city},{" "}
//                         {checkout.shippingAddress.state}
                        
//                     </p>
//                 </div>
//             </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default OrderConfirmation

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from '../redux/slices/cartSlice';

const OrderConfirmation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout);

    // Clear the cart when order is confirmed
    useEffect(() => {
        if (checkout && checkout._id) {
            dispatch(clearCart());
            localStorage.removeItem("cart");
        } else {
            navigate("/my-orders");
        }
    }, [checkout, dispatch, navigate]);

    const calculateExpectedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 7);
        return orderDate;
    };

    // Helper: Convert price based on country
    const getLocalizedPrice = (price) => {
        if (!price) return '';
        const country = checkout?.shippingAddress?.country || 'Nepal';
        let converted = price;
        let currency = 'USD';

        if (country === 'Nepal') {
            currency = 'NPR';
            converted = price; // assume price stored in NPR
        } else if (country === 'India') {
            currency = 'INR';
            converted = price * 0.625; // example conversion
        } else {
            currency = 'USD';
            converted = price * 0.0075; // example conversion
        }

        return new Intl.NumberFormat('en', {
            style: 'currency',
            currency,
            maximumFractionDigits: 2,
        }).format(converted);
    };

    return (
        <div className='max-w-4xl mx-auto py-6 bg-white'>
            <h1 className='text-4xl font-bold text-center mb-8 text-emerald-700'>
                Thank You for Your Order!
            </h1>

            {checkout && (
                <div className='p-6 rounded-lg shadow border'>
                    <div className='flex justify-between mb-20'>
                        {/* Order Id and Date */}
                        <div>
                            <h2 className='text-xl font-semibold'>Order Id: #{checkout._id}</h2>
                            <p className='text-gray-500'>
                                Order date: {new Date(checkout.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className='text-emerald-700 text-sm'>
                                Expected Delivery:{" "}
                                {calculateExpectedDelivery(checkout.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Ordered items */}
                    <div className='mb-20'>
                        {checkout.checkoutItems.map((item) => (
                            <div key={item.productId} className='flex items-center mb-4'>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover mr-4 rounded-lg"
                                />
                                <div>
                                    <h4 className='text-md font-semibold'>{item.name}</h4>
                                    <p className='text-gray-500 text-sm'>{item.color} | {item.size}</p>
                                </div>
                                <div className='ml-auto text-right'>
                                    <p className='text-md'>{getLocalizedPrice(item.price)}</p>
                                    <p className='text-gray-500 text-sm'>Qty: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment and Delivery Info */}
                    <div className='grid grid-cols-2 gap-20'>
                        <div>
                            <h4 className='text-lg font-semibold mb-2'>Payment</h4>
                            <p className='text-gray-600'>
                                {checkout.paymentMethod || 'Cash on Delivery'}
                            </p>
                        </div>
                        <div>
                            <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
                            <p className='text-gray-600'>{checkout.shippingAddress.address}</p>
                            <p className='text-gray-600'>
                                {checkout.shippingAddress.city}, {checkout.shippingAddress.state}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderConfirmation;
