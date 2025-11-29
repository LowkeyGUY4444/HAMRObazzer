import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import login from '../assets/login.jpg';
import { loginUser } from '../redux/slices/authSlice';
import { mergeCart } from '../redux/slices/cartSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Extract everything correctly
    const { user, guestId, loading, error } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    // get redirect parameter and check if its checkout or something
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if (user) {
            if (cart?.product?.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                });
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg shadow-sm border'>

                    <div className='mb-6 justify-center flex'>
                        <h2 className='text-xl font-bold'>HAMRObazzer</h2>
                    </div>

                    <h2 className='text-2xl font-bold mb-6 text-center'>Hey there! 👋</h2>
                    <p className='text-center mb-6'>Enter your Username and Password to login</p>

                    {/*  ERROR MESSAGE DISPLAY */}
                    {error && (
                        <p className="text-red-500 text-center mb-4 font-medium">
                            {error}
                        </p>
                    )}

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                        <input
                            type='text'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                        <input
                            type='password'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-900 transition'
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                    <p className='mt-6 text-center text-sm'>
                        Don't have an account?{" "}
                        <Link
                            to={`/register?redirect=${encodeURIComponent(redirect)}`}
                            className='text-blue-500 hover:underline transition'
                        >
                            Register
                        </Link>
                    </p>

                </form>
            </div>
            
            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img
                        className='h-[750px] w-full object-cover'
                        src={login}
                        alt='login banner'
                    />
                </div>
            </div>
        </div>
    );
};
export default Login;

// import React, { useEffect } from 'react'
// import { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import login from '../assets/login.jpg';
// import {loginUser} from '../redux/slices/authSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { mergeCart } from '../redux/slices/cartSlice';




// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location= useLocation();
//     const{user, guestId}= useSelector((state)=>state.auth);
//     const{cart}= useSelector((state)=>state.cart);

//     //get redirect parameter and check if its checkout or something
//     const redirect = new URLSearchParams(location.search).get("redirect")||"/";
//     const isCheckoutRedirect= redirect.includes("checkout");

//     useEffect(()=>{
//         if(user){
//             if(cart?.product?.length>0 && guestId){
//                 dispatch(mergeCart({guestId,user})).then(()=>{
//                     navigate(isCheckoutRedirect ? "/checkout" : "/");
//                 })
//             }else{
//                 navigate(isCheckoutRedirect ? "/checkout" : "/");
//             }
//         }
//     }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch])

//         const handleSubmit = async (e) => {
//         e.preventDefault();
//        dispatch(loginUser({email, password}));
//     };



//   return (
//     <div className='flex'>
//         <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
//             <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg shadow-sm border'>
//                 <div className='mb-6 justify-center flex'>
//                     <h2 className='text-xl font-bold'>HAMRObazzer</h2>
//                 </div>
//                 <h2 className='text-2xl font-bold mb-6 text-center'>Hey there! 👋</h2>
//                 <p className='text-center mb-6'>Enter your Username and Password to login</p>
//                 <div className='mb-4'>
//                     <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
//                         <input type='text' 
//                         placeholder='Email' 
//                         onChange={(e) => setEmail(e.target.value)}
//                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight' 
//                         required
//                         />
//                 </div>
//                 <div className='mb-4'>
//                     <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
//                         <input type='password' 
//                         placeholder='Password' 
//                         onChange={(e) => setPassword(e.target.value)}
//                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
//                         required
//                         />
//                 </div>
//                 <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-900
//                 transition'>Sign In</button>

//                 <p className='mt-6 text-center text-sm'>Dont have an account?{" "}
//                     <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500 hover:underline transition'>Register</Link>
//                 </p>

//             </form>
//         </div>
//         <div className='hidden md:block w-1/2 bg-gray-800'>
//             <div className='h-full flex flex-col justify-center items-center'>
//                 <img className=' h-[750px] w-full object-cover' src={login} alt='login banner'></img>
//             </div>
//         </div>
      
//     </div>
//   )
// }

// export default Login



// // for input 
// // w-full p-2 rounded border