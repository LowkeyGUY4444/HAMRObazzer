import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link,  useLocation, useNavigate } from 'react-router-dom';
import register from '../assets/login.jpg';
import {registerUser} from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';


const Register = () => {
    


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    // const [error, setError] = useState('');
    // const [loading, setLoading]

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location= useLocation();
    const{user, guestId}= useSelector((state)=>state.auth);
    const{cart}= useSelector((state)=>state.cart);

    //get redirect parameter and check if its checkout or something
    const redirect = new URLSearchParams(location.search).get("redirect")||"/";
    const isCheckoutRedirect= redirect.includes("checkout");

    useEffect(()=>{
        if(user){
            if(cart?.product?.length>0 && guestId){
                dispatch(mergeCart({guestId,user})).then(()=>{
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                })
            }else{
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log('User registered', { name, email, password });
        dispatch(registerUser({ name, email, password }));
    };

  return (
    <div className='flex'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
            <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg shadow-sm border'>
                <div className='mb-6 justify-center flex'>
                    <h2 className='text-xl font-bold'>HAMRObazzer</h2>
                </div>
                <h2 className='text-2xl font-bold mb-6 text-center'>Welcome!👋</h2>
                <p className='text-center mb-6'>Please fill in you details to carate an account.</p>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                    <input type='text' 
                        placeholder='Enter your name' 
                        onChange={(e) => setName(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight' 
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                        <input type='email' 
                        placeholder='Email' 
                        onChange={(e) => setEmail(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight' 
                        required
                        />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                        <input type='password' 
                        placeholder='Password' 
                        onChange={(e) => setPassword(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                        required
                        />
                </div>
                <button 
                type='submit' 
                className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-900
                transition'>Sign Up</button>

                <p className='mt-6 text-center text-sm'>Alrady have an account?{" "}
                    <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500 hover:underline transition'>Login</Link>
                </p>

            </form>
        </div>
        <div className='hidden md:block w-1/2 bg-gray-800'>
            <div className='h-full flex flex-col justify-center items-center'>
                <img className=' h-[750px] w-full object-cover' src={register} alt='login banner'></img>
            </div>
        </div>
      
    </div>
  )
}

export default Register
