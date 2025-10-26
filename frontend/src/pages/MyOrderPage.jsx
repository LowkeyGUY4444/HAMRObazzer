// import React, { use, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchUserOrders } from '../redux/slices/orderSlice';



// const MyOrderPage = () => {

//     const navigate = useNavigate();
//     const dispatch =useDispatch();
//     const{ orders, loading,error}= useSelector((state)=> state.orders);

//     useEffect(()=>{
//         dispatch(fetchUserOrders());
//     },[dispatch])

//     const handleRowClick = (orderId) => {
//          navigate(`/order/${orderId}`);
//     };

//     if(loading) return<p>Loading ...</p>
//     if(error) return<p>Error: {error}</p>

//   return (
//     <div className='max-w-7xl mx-auto p-4 sm:p-6'>
//       <h2 className='text-xl sm:text:2xl font-semibold mb-6'>My Order</h2>
//       <div className='ralative shadow-md sm:rounded-lg overflow-hidden'>
//         <table className='min-w-full text=left text-gray-500'>
//             <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
//                 <tr>
//                     <th className='py-2 px-4 sm:py-3 text-left'>Image</th>
//                     <th className='py-2 px-4 sm:py-3 text-left'>Order ID</th>
//                     <th className='py-2 px-4 sm:py-3 text-left'>Created</th>
//                     <th className='py-2 px-4 sm:py-3 text-left'>Shipping Address</th>
//                     <th className='py-2 px-4 sm:py-3 text-left'>Items</th>
//                     <th className='py-2 px-4 sm:py-3 text-left'>Price</th>
//                     <th className='py-2 px-4 sm:py-3 text-left'>Status</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {orders.length > 0 ? (
//                     orders.map((order) => (
//                         <tr 
//                             key={order._id} 
//                             onClick={() => handleRowClick(order._id)}
//                             className='border-b hover:border-gray-50 cursor-pointer'>
//                                 <td className='py-2 px-2 sm:py-4 sm:px-4'>
//                                     <img
//                                     src={order.orderItems[0].image}
//                                     alt={order.orderItems[0].name}
//                                     className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
//                                     />
//                                 </td>
//                                 <td className='py-2 px-2 sm:py-4 sm:px-4'>
//                                     #{order._id}
//                                 </td>
//                                 <td className='py-2 px-2 sm:py-4 sm:px-4'>
//                                     {new Date(order.createdAt).toLocaleDateString()}
//                                 </td>
//                                 <td className='py-2 px-2 sm:py-4 sm:px-4'>
//                                     {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.country}
//                                 </td>  
//                                 <td className='py-2 px-2 sm:py-4 sm:px-4'>
//                                     {order.orderItems.length}
//                                 </td>
//                                 <td className='py-2 px-2 sm:py-4 sm:px-4'>
//                                     {order.totalPrice}
//                                 </td>
//                                 <td className='py-2 px-2 sm:py-4 sm:px-4'>
//                                     <span
//                                         className={`${
//                                             order.isDelivered
//                                             ? 'bg-green-100 text-green-700'
//                                             : 'bg-yellow-100 text-yellow-700'
//                                         } px-2 py-2 rounded-full text-xs sm:text-sm font-medium`}
//                                         >
//                                         {order.isDelivered ? 'Delivered' : 'Processing'}
//                                     </span>
//                                 </td>
                                
//                         </tr>                           
//                     ))
//                 ):(                                       
//                     <tr>
//                         <td
//                             colSpan={7}
//                             className='py-4 px-4 text-center text-gray-500'
//                         >
//                             No order found.
//                         </td>
//                     </tr>
//                 )}
//             </tbody>

//         </table>
//       </div>
//     </div>
//   )
// }

// export default MyOrderPage


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../redux/slices/orderSlice';

const MyOrderPage = ({ userCountry }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  // Currency conversion function
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

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-xl sm:text-2xl font-semibold mb-6'>My Orders</h2>
      <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
        <table className='min-w-full text-left text-gray-500'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th className='py-2 px-4 sm:py-3 text-left'>Image</th>
              <th className='py-2 px-4 sm:py-3 text-left'>Order ID</th>
              <th className='py-2 px-4 sm:py-3 text-left'>Created</th>
              <th className='py-2 px-4 sm:py-3 text-left'>Shipping Address</th>
              <th className='py-2 px-4 sm:py-3 text-left'>Items</th>
              <th className='py-2 px-4 sm:py-3 text-left'>Price</th>
              <th className='py-2 px-4 sm:py-3 text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className='border-b hover:border-gray-50 cursor-pointer'
                >
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg'
                    />
                  </td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>#{order._id}</td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>
                    {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.country}
                  </td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>{order.orderItems.length}</td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>
                    {getLocalizedPrice(order.totalPrice)}
                  </td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        order.status === 'Processing'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'Shipped'
                          ? 'bg-orange-100 text-orange-700'
                          : order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Cancelled'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>
                  No order found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderPage;
