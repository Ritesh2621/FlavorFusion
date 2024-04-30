import React from 'react'
import food from '../assest/food.jpg';
import Login from '../components/Login';
import Register from '../components/Register';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <>
    <div className='w-full border-8 border-brown-800 '>
    <div className='absolute object-fill border-8 border-brown-200  h-[665px]'>
   <img src={food} alt="cover" className=' '/>
    </div>
   <div className='opacity-75 bg-gray-600'>
    <p>FlavorFusion</p>
    <p>Help you to cook healthy food</p>
    <Link to='/auth/register'>Register</Link>
    <Link to='/auth/login'>Login</Link>
   </div>

    </div>
   
    </>
  )
}

export default Auth