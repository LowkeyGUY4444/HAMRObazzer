
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchOrderDetails } from '../redux/slices/orderSlice';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  const [userCountry, setUserCountry] = useState(null);

  // Fetch order details
  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  // Detect user country using API
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

  // Currency conversion
  const getLocalizedPrice = (price) => {
    if (!price) return '';

    let convertedPrice = price;
    let currency = 'USD';

    if (userCountry === 'NP') {
      currency = 'NPR';
      convertedPrice = price;
    } else if (userCountry === 'IN') {
      currency = 'INR';
      convertedPrice = price * 0.625; // example rate
    } else {
      currency = 'USD';
      convertedPrice = price * 0.0075; // example rate
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
    <div className='max-w-7xl mx-auto py-4 sm:p-6'>
      <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
      {!orderDetails ? (
        <p>No order found</p>
      ) : (
        <div className='p-4 sm:p-6 rounded-lg shadow border'>
          {/* Order Info */}
          <div className='flex flex-col sm:flex-row justify-between mb-8'>
            <div>
              <h3 className='text-lg font-semibold mb-2'>Order Id: #{orderDetails._id}</h3>
              <p className='text-gray-500'>
                Order Date: {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0 gap-y-2'>
              {/* <span
                className={`${
                  orderDetails.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                } px-3 py-1 rounded-full text-xs`}
              >
                {orderDetails.isPaid ? 'Approved' : 'Pending'}
              </span> */}
              <span
                className='bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs sm:text-sm font-medium'
              >
                Approved
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        orderDetails.status === 'Processing'
                          ? 'bg-blue-100 text-blue-700'
                          : orderDetails.status === 'Shipped'
                          ? 'bg-orange-100 text-orange-700'
                          : orderDetails.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : orderDetails.status === 'Cancelled'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
              >
                {orderDetails.status}
              </span>
            </div>
          </div>

          {/* Customer, Payment, Shipping info */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8 gap-8'>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
              <p className='text-gray-500'>Payment Method: {orderDetails.paymentMethod}</p>
              {/* <p className='text-gray-500'>Status: {orderDetails.isPaid ? 'Paid' : 'Pending'}</p> */}
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
              <p className='text-gray-500'>
                Shipping Method: {orderDetails.shippingMethod}
              </p>
              <p className='text-gray-500'>
                City: {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}
              </p>
              <p className='text-gray-500'>
                Status: {orderDetails.status}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className='overflow-x-auto'>
            <h4 className='text-lg font-semibold mb-4'>Products</h4>
            <table className='min-w-full mb-4 text-gray-500'>
              <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                <tr>
                  <th className='py-2 px-4 sm:py-3 text-left'>Name</th>
                  <th className='py-2 px-4 sm:py-3 text-left'>Unit Price</th>
                  <th className='py-2 px-4 sm:py-3 text-left'>Quantity</th>
                  <th className='py-2 px-4 sm:py-3 text-left'>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className='border-b'>
                    <td className='py-2 px-4 flex items-center'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-12 h-12 object-cover mr-4 rounded-lg'
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className='text-blue-500 hover:underline'
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className='py-2 px-4'>{userCountry ? getLocalizedPrice(item.price) : '...'}</td>
                    <td className='py-2 px-4'>{item.quantity}</td>
                    <td className='py-2 px-4'>
                      {userCountry ? getLocalizedPrice(item.price * item.quantity) : '...'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back To Order Link */}
          <Link to='/my-orders' className='text-blue-500 hover:underline'>
            Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;














// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom'
// import { fetchOrderDetails } from '../redux/slices/orderSlice';

// const OrderDetailsPage = () => {
//   const { id } = useParams();
//   const dispatch= useDispatch();
//   const {orderDetails, loading, error}= useSelector((state)=> state.orders);

//   useEffect(()=>{
//     dispatch(fetchOrderDetails(id));  
//   },[dispatch, id])
  
//   if(loading) return<p>Loading ...</p>
//   if(error) return<p>Error:{error}</p>
  
            
//   return (
//     <div className='max-w-7xl mx-auto py-4 sm:p-6'> 
//         <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
//         {!orderDetails ? (
//             <p>No order found</p>
//         ) : (
//             <div className='p-4 sm:p-6 rounded-lg shadow border'>
//                 {/* Orer Info */}
//                 <div className='flex flex-col sm:flex-row justify-between mb-8'>
//                     <div>
//                         <h3 className='text-lg font-semibold mb-2'>Order Id: #{orderDetails._id}</h3>
//                         <p className='text-gray-500'>Order Date: {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
//                     </div>
//                     <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0 gap-y-2'>
//                         <span className={`${orderDetails.isPaid ?
//                              'bg-green-100 text-green-700'
//                              : 
//                              'bg-red-100 text-red-700'} px-3 py-1 rounded-full text-xs`}
//                              >
//                             {orderDetails.isPaid ? 'Approved' : 'Pending'}
//                         </span>
//                         <span className={`${orderDetails.isDeliverd ?
//                              'bg-green-100 text-green-700'
//                              : 
//                              'bg-red-100 text-red-700'} px-3 py-1 rounded-full text-xs`}
//                              >
//                             {orderDetails.isDeliverd ? 'Delivered' : 'Pending'}
//                         </span>
//                     </div>
//                 </div>
//                 {/* customer, Payment, Shippinginfo */}
//                 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8 gap-8'>
//                     <div>
//                         <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
//                         <p className='text-gray-500'>Payment Method: {orderDetails.paymentMethod}</p>
//                         <p className='text-gray-500'>Status: {orderDetails.isPaid ? 'Paid' : 'Pending'}</p>
//                     </div>
//                     <div>
//                         <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
//                         <p className='text-gray-500'>Shipping Method: {orderDetails.shippingMethod}</p>
//                         <p className='text-gray-500'>City: {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}</p>
//                         <p className='text-gray-500'>Status: {orderDetails.isDeliverd ? 'Paid' : 'Pending'}</p>
//                     </div>
//                 </div>
//                 {/* Product List */}
//                 <div className='overflow-x-auto'>
//                     <h4 className='text-lg font-semibold mb-4'>Products</h4>
//                     <table className='min-w-full mb-4 text-gray-500'>
//                         <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
//                             <tr>
//                                 <th className='py-2 px-4 sm:py-3 text-left'>Name</th>
//                                 <th className='py-2 px-4 sm:py-3 text-left'>Unit Price</th>
//                                 <th className='py-2 px-4 sm:py-3 text-left'>Quantity</th>
//                                 <th className='py-2 px-4 sm:py-3 text-left'>Total</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orderDetails.orderItems.map((item) => (
//                                 <tr key={item.productId} className='border-b '>
//                                     <td className='py-2 px-4 flex items-center'>
//                                         <img
//                                             src={item.image}
//                                             alt={item.name}
//                                             className="w-12 h-12 object-cover mr-4 rounded-lg"
//                                         />
//                                         <Link 
//                                             to={`/product/${item.productId}`} 
//                                             className='text-blue-500 hover:underline'
//                                         >
//                                                 {item.name}
//                                         </Link>
//                                     </td> 
//                                     <td className='py-2 px-4'>Rs.{item.price}</td> 
//                                     <td className='py-2 px-4'>{item.quantity}</td> 
//                                     <td className='py-2 px-4'>Rs.{item.price * item.quantity}</td> 
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 {/* Back To Order Link */}
//                 <Link to='/my-orders' className='text-blue-500 hover:underline '>Back to My Orders</Link>
//             </div>
//         )}
    
//     </div>
//   )
// }

// export default OrderDetailsPage
