// // import React,  { useEffect } from 'react'
// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import PaypalButton from './PaypalButton';
// // import { useDispatch, useSelector } from 'react-redux';
// // import axios from 'axios';
// // import { createCheckout } from "../../redux/slices/checkoutSlice";

// // //import { createCheckout } from "../redux/slices/checkoutSlice";
// //  //zipCode
// // const Checkout = () => {
// //     const navigate = useNavigate();
// //     const dispatch= useDispatch();
// //     const{cart, loading, error}= useSelector((state)=>state.cart);
// //     const{user}= useSelector((state)=>state.auth);
// //     const [checkoutId, setCheckoutId] = useState(null);
// //     const [ShippingAddress, setShippingAddress] = useState({
// //         firstName: '',
// //         lastName: '',
// //         address: '',
// //         city: '',
// //         state: '',
// //         postalCode: '',
// //         country: '',
// //         phone: '',
// //     });
// //       // this will help me to auto detect country....
// //     useEffect(() => {
// //         const fetchCountry = async () => {
// //         try {
// //             const res = await fetch("https://ipapi.co/json/");
// //             const data = await res.json();
// //             if (data && data.country_name) {
// //             setShippingAddress((prev) => ({
// //                 ...prev,
// //                 country: data.country_name,
// //             }));
// //             }
// //         } catch (error) {
// //             console.error("Error fetching country:", error);
// //         }
// //         };
// //         fetchCountry();
// //     }, []);

// //     //ensure cart is loaded before procedding
// //     useEffect(()=>{
// //         if(!cart || !cart.products || cart.products.length===0){
// //             navigate("/");
// //         }
// //     }, [cart, navigate]);

// //     const handledCreateCheckout =  async (e) => {
// //         e.preventDefault();
// //         if(cart && cart.products.length>0)
// //         {const res = await dispatch(
// //             createCheckout({
// //             checkoutItems: cart.products,
// //             shippingAddress: ShippingAddress,
// //             paymentMethod: "Paypal",
// //             totalPrice: cart.totalPrice,
// //         })
// //         );
// //         if(res.payload && res.payload._id){
// //             setCheckoutId(res.payload._id); //set Checkout ID if checkout was successful
// //         }
// //         }
// //     };

// //     const handlePaymentSuccess = async (details) => {
// //         try {
// //             const response= await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/checkout/${checkoutId}/pay`,{paymentStatus: "paid", paymentDetails: details},
// //                 {
// //                     headers:{
// //                         Authorization: `Bearer ${localStorage.getItem("userToken")}`
// //                     },
// //                 }
// //             );
// //                 await handleFinalizeCheckout(checkoutId);//Finalize the checkout if the paymeny=t is success
// //         } catch (error) {
// //             console.error(error);
// //         }
// //     };

// //     const handleFinalizeCheckout= async(checkoutId)=>{
// //         try {
// //             const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,{},
// //                 {
// //                     headers:{
// //                         Authorization: `Bearer ${localStorage.getItem("userToken")}`
// //                     },
// //                 }
// //             );
// //              navigate("/orderconfirmation");
// //         } catch (error) {
// //             console.error(error);
// //         }
// //     }
// //     if(loading) return <p>Loading cart ...</p>
// //     if(error) return <p>error:{error}</p>
// //     if(!cart || !cart.products || cart.products.length===0) return <p>Your cart is empty</p>




// //   return (
// //     <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
// //       {/* leftSection */}
// //       <div className='bg-white p-6 rounded-lg'>
// //         <h2 className='text-2xl uppercase mb-6'>
// //             CheckOut
// //         </h2>

// //         <form onSubmit={handledCreateCheckout}>
// //             <h3 className='text-lg mb-4'>Contact Details</h3>
// //             <div className='mb-4'>
// //                 <label className=" block text-gray-700">E-mail</label>
// //                 <input type='email' value={user?.email} readOnly className='w-full p-2 border rounded'  />
// //             </div>

// //             <h3 className='text-lg mb-4'>Details</h3>
// //             <div className='mb-4 grid grid-cols-2 gap-4'>
// //                 <div>
// //                 <label className=" block text-gray-700">First Name</label>
// //                 <input 
// //                     type='text' 
// //                     value={ShippingAddress.firstName} 
// //                     onChange={(e) => setShippingAddress({...ShippingAddress, firstName: e.target.value})} 
// //                     className='w-full p-2 border rounded' 
// //                     required />
// //                 </div>
// //                 <div>
// //                     <label className=" block text-gray-700">Last Name</label>
// //                     <input 
// //                         type='text' 
// //                         value={ShippingAddress.lastName} 
// //                         onChange={(e) => setShippingAddress({...ShippingAddress, lastName: e.target.value})} 
// //                         className='w-full p-2 border rounded' 
// //                         required />
// //                 </div>
// //             </div>
// //             <div className='mb-4'>
// //                 <label className=" block text-gray-700">Address</label>
// //                 <input 
// //                     type='text' 
// //                     value={ShippingAddress.address} 
// //                     onChange={(e) => setShippingAddress({...ShippingAddress, address: e.target.value})} 
// //                     className='w-full p-2 border rounded' 
// //                     required />
// //             </div>

// //             <div className='mb-4 grid grid-cols-2 gap-4'>
// //                 <div>
// //                 <label className=" block text-gray-700">City</label>
// //                 <input 
// //                     type='text' 
// //                     value={ShippingAddress.city} 
// //                     onChange={(e) => setShippingAddress({...ShippingAddress, city: e.target.value})} 
// //                     className='w-full p-2 border rounded' 
// //                     required />
// //                 </div>
// //                 <div>
// //                     <label className=" block text-gray-700">postalCode</label>
// //                     <input 
// //                         type='text' 
// //                         value={ShippingAddress.postalCode} 
// //                         onChange={(e) => setShippingAddress({...ShippingAddress, postalCode: e.target.value})} 
// //                         className='w-full p-2 border rounded' 
// //                         required />
// //                 </div>
// //             </div>
// //             <div className='mb-4'>
// //                 <label className=" block text-gray-700">Country</label>
// //                 <input 
// //                     type='text' 
// //                     value={ShippingAddress.country} 
// //                     onChange={(e) => setShippingAddress({...ShippingAddress, country: e.target.value})} 
// //                     className='w-full p-2 border rounded' 
// //                     readOnly
// //                     required />
// //             </div>
// //             <div className='mb-4'>
// //                 <label className=" block text-gray-700">Phone</label>
// //                 <input 
// //                     type='text' 
// //                     value={ShippingAddress.phone} 
// //                     onChange={(e) => setShippingAddress({...ShippingAddress, phone: e.target.value})} 
// //                     className='w-full p-2 border rounded' 
// //                     required />
// //             </div>

// //             {/* checkout button         */}

// //             <div className='mt-6'>
// //                 {!checkoutId ? (
// //                     <button type='submit' className='w-full bg-TopBar-red text-white py-2 px-4 rounded hover:bg-red-600'>
// //                         Continue to Payment
// //                     </button>
// //                 ) : (
// //                     <div>
// //                         {/* paypal component */}
                        
// //                         <PaypalButton amount={cart.totalPrice} onSuccess={handlePaymentSuccess} onError={(err) => {
// //                             console.log(err);
// //                         alert("payment Unsuccessful! Try again")}} />

// //                         {/* ✅ Cash on Delivery */}
// //                         <button
// //                             onClick={async () => {
// //                                 const res = await dispatch(
// //                                 createCheckout({
// //                                     checkoutItems: cart.products,
// //                                     shippingAddress: ShippingAddress,
// //                                     paymentMethod: "Cash on Delivery",
// //                                     totalPrice: cart.totalPrice,
// //                                 })
// //                                 );
// //                                 if (res.payload && res.payload._id) {
// //                                 navigate("/orderconfirmation");
// //                                 }
// //                             }}
// //                             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
// //                         >
// //                             Cash on Delivery
// //                         </button>

// //                     </div>                  
// //                 )}

// //             </div>
// //         </form>
// //       </div>
// //       {/* Right Section */}
// //       <div className='bg-gray-50 p-6 rounded-lg'>
// //         <h3 className='text-lg mb-4'>Order Summary</h3>
// //         <div className='border-t py-4 mb-4'>
// //             {cart.products.map((product, index) => (
// //                 <div key={index} className='flex justify-between items-start py-2 border-b'>
// //                     <div className='flex items-start'>
                     
// //                         <img
// //                             src={product.image}
// //                             alt={product.name}
// //                             className="w-20 h-24 object-cover mr-4"
// //                         />
// //                         <div> 
// //                             <h3 className='text-mb'>{product.name}</h3>
// //                             <p className='text-gray-500'>Size: {product.size}</p>
// //                             <p className='text-gray-500'>Color: {product.color}</p>
// //                         </div>
// //                     </div>
// //                     <p className='text-xl'>RS.{product.price?.toLocaleString()}</p>
// //                 </div>
// //             ))}

// //         </div>
// //             <div className='flex justify-between items-center text-lg mb-4'>
// //                 <p>Total</p>
// //                 <p>RS.{cart.totalprice?.toLocaleString()}</p>
// //             </div>
// //             <div className='flex justify-between items-center text-lg'>
// //                 <p>Shipping</p>
// //                 <p>Free</p>
// //             </div>
// //             <div className='flex justify-between items-center text-lg mb-4 border-t pt-4'>
// //                 <p className='font-bold'>Total</p>
// //                 <p className='font-bold'> RS.{cart.totalPrice?.toLocaleString()}</p>

// //             </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Checkout



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaypalButton from './PaypalButton';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createCheckout } from "../../redux/slices/checkoutSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
  const [ShippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  // Detect country using ipwhois.app
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch('https://ipwhois.app/json/');
        const data = await res.json();
        if (data && data.country) {
          setShippingAddress((prev) => ({
            ...prev,
            country: data.country,
          }));
        }
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };
    fetchCountry();
  }, []);

  // Ensure cart is loaded
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

  const handledCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress: ShippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: 'paid', paymentDetails: details },
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );
      navigate('/orderconfirmation');
    } catch (error) {
      console.error(error);
    }
  };

  // Helper: Convert price based on country
  const getLocalizedPrice = (price) => {
    if (!price) return '';
    const country = ShippingAddress.country;
    let converted = price;
    let currency = 'USD';

    if (country === 'Nepal') {
      currency = 'NPR';
      converted = price; // assume cart.price is already in NPR
    } else if (country === 'India') {
      currency = 'INR';
      converted = price * 0.625; // example conversion rate
    } else {
      currency = 'USD';
      converted = price * 0.0075; // example conversion rate
    }

    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(converted);
  };

  if (loading) return <p>Loading cart ...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) return <p>Your cart is empty</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl uppercase mb-6">CheckOut</h2>

        <form onSubmit={handledCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">E-mail</label>
            <input type="email" value={user?.email}  className="w-full p-2 border rounded" />
          </div>

          <h3 className="text-lg mb-4">Details</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={ShippingAddress.firstName}
                onChange={(e) => setShippingAddress({ ...ShippingAddress, firstName: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={ShippingAddress.lastName}
                onChange={(e) => setShippingAddress({ ...ShippingAddress, lastName: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={ShippingAddress.address}
              onChange={(e) => setShippingAddress({ ...ShippingAddress, address: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={ShippingAddress.city}
                onChange={(e) => setShippingAddress({ ...ShippingAddress, city: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={ShippingAddress.postalCode}
                onChange={(e) => setShippingAddress({ ...ShippingAddress, postalCode: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={ShippingAddress.country}
              readOnly
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              value={ShippingAddress.phone}
              onChange={(e) => setShippingAddress({ ...ShippingAddress, phone: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Checkout button */}
          <div className="mt-6">
            {!checkoutId ? (
              <button type="submit" className="w-full bg-TopBar-red text-white py-2 px-4 rounded hover:bg-red-600">
                Continue to Payment
              </button>
            ) : (
              <div>
                <PaypalButton
                  amount={cart.totalPrice} // you can also use converted total here if needed
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => {
                    console.log(err);
                    alert('Payment Unsuccessful! Try again');
                  }}
                />

                <button
                  onClick={async () => {
                    const res = await dispatch(
                      createCheckout({
                        checkoutItems: cart.products,
                        shippingAddress: ShippingAddress,
                        paymentMethod: 'Cash on Delivery',
                        totalPrice: cart.totalPrice,
                      })
                    );
                    if (res.payload && res.payload._id) navigate('/orderconfirmation');
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
                >
                  Cash on Delivery
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div key={index} className="flex justify-between items-start py-2 border-b">
              <div className="flex items-start">
                <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4" />
                <div>
                  <h3 className="text-mb">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">{getLocalizedPrice(product.price)}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Total</p>
          <p>{getLocalizedPrice(cart.totalPrice)}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mb-4 border-t pt-4">
          <p className="font-bold">Total</p>
          <p className="font-bold">{getLocalizedPrice(cart.totalPrice)}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

